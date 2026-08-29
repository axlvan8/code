#description
#DAY2.py
#import statements go here

import DAY1
import time
import update
# import sys

#define variables here

version = "V0.0.1"
halt = False

#functions

def init():
    DAY1.printWithTimestamp("initializing...")
    DAY1.printWithTimestamp(f"Bob Drone AI {version}")
    #DAY1.printWithTimestamp(f"WinVersion: {sys._WinVersion}")
    con = str(input("Do you want to proceed? [Y/n] : "))
    if con == "Y" :
        DAY1.printWithTimestamp("continuing...")
        DAY1.printWithTimestamp("To stop at any time, press CTRL+C")
        time.sleep(5)
        DAY1.printWithTimestamp("To stop at any time, press CTRL+C")
        onerr()
        startUPD()
    else : 
        return 0

def onerr():
    for i in range(11) : 
        DAY1.printWithTimestamp(f"An error has occurred [{i}]")
        time.sleep(1)
    DAY1.printWithTimestamp("Failed to open \\EFI\\ubuntu\\ - File does not exist.")
    DAY1.printWithTimestamp("Program restarting...")

def startUPD():
    while(not halt) :
        update.update()


#main code

