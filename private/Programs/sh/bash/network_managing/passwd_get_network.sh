#!/bin/bash
# Script to fetch Wi-Fi passwords directly from an SSH-enabled router

ROUTER_IP="192.168.86.1"   # Replace with your router's gateway IP
ROUTER_USER="testwifi.here"       # Replace with your router's admin username
ROUTER_PASS="YourAdminPwd" # Replace with your router's admin password

echo "[*] Connecting to router at $ROUTER_IP..."

# Case 1: For ASUS (AsusWRT) routers using 'nvram' variables
echo "--- Checking AsusWRT configuration ---"
sshpass -p "$ROUTER_PASS" ssh -o StrictHostKeyChecking=no "${ROUTER_USER}@${ROUTER_IP}" \
  "echo '2.4GHz SSID: ' && nvram get wl0_ssid && echo '2.4GHz Password: ' && nvram get wl0_wpa_psk && echo '5GHz SSID: ' && nvram get wl1_ssid && echo '5GHz Password: ' && nvram get wl1_wpa_psk" 2>/dev/null

# Case 2: For OpenWRT / DD-WRT routers using 'uci' configuration
echo "--- Checking OpenWRT configuration ---"
sshpass -p "$ROUTER_PASS" ssh -o StrictHostKeyChecking=no "${ROUTER_USER}@${ROUTER_IP}" \
  "uci show wireless | grep -E '(ssid|key)'" 2>/dev/null
