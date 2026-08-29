#!/bin/bash

# Define the target IP address
TARGET=$1

echo "Scanning $TARGET for OS clues..."

# Run nmap with OS detection (-O) and save the output
# Note: Root privileges (sudo) are required for OS detection
SCAN_RESULT=$(sudo nmap -O --osscan-guess "$TARGET")

# Parse and print the OS guess
echo "$SCAN_RESULT" | grep -E "OS details:|Running:|Aggressive OS guesses:" || echo "OS could not be determined."
