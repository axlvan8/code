#!/bin/bash

TARGET_IP=$1
TARGET_PORT=$2

# Fetch and display the directory listing in the terminal
curl -s http://$TARGET_IP:$TARGET_PORT/ | grep -oE 'href="[^"]+"' | sed 's/href="//;s/"//'
