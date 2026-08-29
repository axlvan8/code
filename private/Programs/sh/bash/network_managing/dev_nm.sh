#!/bin/bash
if [ "$EUID" -ne 0 ]; then
  echo "Please run this script with sudo."
  exit 1
fi

# Fix line 4 error by using standard POSIX ID checking compatible with all shells
if [ "$(id -u)" -ne 0 ]; then
  echo "Error: This script must be run with sudo to scan other devices."
  echo "Please run: sudo bash dev_nm.sh"
  exit 1
fi

echo "Searching for your active Wi-Fi interface..."

# Automatically detect the primary wireless interface
WIFI_INT=$(ip link show up | awk -F': ' '/wl/{print $2}' | head -n 1)

if [ -z "$WIFI_INT" ]; then
    WIFI_INT=$(ip route show | grep default | awk '{print $5}' | head -n 1)
fi

if [ -z "$WIFI_INT" ]; then
    echo "Error: No active network interface found."
    exit 1
fi

# Get the network address in CIDR notation
NET_RANGE=$(ip -o -f inet addr show dev "$WIFI_INT" | awk '{print $4}' | head -n 1)

if [ -z "$NET_RANGE" ]; then
    echo "Error: Could not retrieve IP range for interface $WIFI_INT."
    exit 1
fi

echo "Interface detected: $WIFI_INT"
echo "Scanning network range: $NET_RANGE"
echo "--------------------------------------------------------"
printf "%-18s %-20s %-30s\n" "IP ADDRESS" "MAC ADDRESS" "DEVICE NAME / HOSTNAME"
echo "--------------------------------------------------------"

# Primary deep scanning using Nmap
if command -v nmap >/dev/null 2>&1; then
    nmap -sn "$NET_RANGE" | awk '
    /^Nmap scan report for/ {
        if ($0 ~ /\(/) {
            name = $5
            ip = substr($6, 2, length($6)-2)
        } else {
            name = "Unknown"
            ip = $5
        }
    }
    /^MAC Address:/ {
        mac = $3
        vendor = substr($0, index($0,$4))
        printf "%-18s %-20s %-30s\n", ip, mac, name " " vendor
        ip=""; mac=""; name=""
    }
    END {
        if (ip != "") {
            printf "%-18s %-20s %-30s\n", ip, "Local Device", name
        }
    }'
else
    echo "Nmap is not installed. Falling back to basic ARP cache scan..."
    echo "--------------------------------------------------------"
    arp -an -i "$WIFI_INT" | awk '{print $2, $4}' | tr -d '()' | while read -r ip mac; do
        if [ "$mac" != "<incomplete>" ]; then
            name=$(dig +short -x "$ip" | sed 's/\.$//')
            [ -z "$name" ] && name="Unknown"
            printf "%-18s %-20s %-30s\n" "$ip" "$mac" "$name"
        fi
    done
fi

echo "--------------------------------------------------------"
echo "Scan complete."