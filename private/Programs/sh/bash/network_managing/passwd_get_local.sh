#!/bin/bash
# Script to find the password of saved WPA Wi-Fi networks in Linux

# Ensure the script is run with root privileges
if [ "$EUID" -ne 0 ]; then
  echo "[-] Please run as root (e.g., sudo ./get_wifi_pwd.sh)"
  exit 1
fi

CONFIG_DIR="/etc/NetworkManager/system-connections/"

if [ -z "$1" ]; then
  echo "[*] Listing all saved networks and their passwords:"
  echo "================================================="
  # Loop through all connection files
  for file in "$CONFIG_DIR"*.nmconnection; do
    if [ -f "$file" ]; then
      ssid=$(sudo grep -w "ssid" "$file" | cut -d= -f2)
      psk=$(sudo grep -w "psk" "$file" | cut -d= -f2)
      
      # Print if there's an SSID and Password
      if [ -n "$ssid" ] && [ -n "$psk" ]; then
        echo "Network : $ssid"
        echo "Password: $psk"
        echo "-------------------------------------------------"
      fi
    fi
  done
else
  # Search for a specific network provided as the first argument
  file="${CONFIG_DIR}${1}.nmconnection"
  if [ -f "$file" ]; then
    ssid=$(sudo grep -w "ssid" "$file" | cut -d= -f2)
    psk=$(sudo grep -w "psk" "$file" | cut -d= -f2)
    echo "Network : $ssid"
    echo "Password: $psk"
  else
    echo "[-] Network '$1' not found."
  fi
fi
