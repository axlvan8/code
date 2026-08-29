#from drone_teaching_package.simulated_tello import EasyTelloToSimulatedDrone
#from drone_teaching_package.simulated_tello import EasyTelloRealDrone
#import keyboard
import drone_teaching_package.simulated_tello

import sys
from typing import List, Tuple, Dict

from datetime import datetime
from time import sleep
import math 
import json
import time

warnings = ["YOU ARE A BAD PERSON!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! I SAID TO CHOOSE NUMBER 1 OR 2!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!, BUT YOU DID NOT LISTEN!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", "YOU ARE THE WORST PERSON EVER!!!!!!!!!!!!!!!!!!!!!!!!!! TO HAVE LIVED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", "im tired."]
warning = 0

def get_drone(key):
    print("select mode: ")
    print("1. Simulated drone")
    print("2. Real drone")

    choice = int(input("Enter your choice [1, 2] : "))

    if choice == 1 :
        simulator_key = key
        return drone_teaching_package.simulated_tello.EasyTelloToSimulatedDrone(simulator_key=simulator_key)
    elif choice == 2 :
        return drone_teaching_package.simulated_tello.EasyTelloRealDrone()
    else:
        print(warnings[warning])
        warning = warning + 1
        if warning > 2 :
            return 0
        return get_drone




drone = get_drone(sys.argv[1])#"66aac9bd-ec33-4bc2-a106-162773ea32a2"
drone.connect()
drone.takeoff()
battery = drone.get_battery()
drone.set_speed(100)
#drone.go(100,100,50,20)
#drone.curve(50,50,0,100,100.50,30,100)
op = 0
i = 0
instr = 0
def auto():
    while True:
        #drone.forward(instr)
        #if i < 100 :
        #    instr = 10
        #else:
        #    instr = 0
        time.sleep(0.01)
        #print(battery)
        drone.forward(10)
        if op == 0:
            drone.cw(145) # for star
        elif op == 1:
            drone.cw(45) # hexagon
        elif op == 2:
            drone.cw(60) # that shape that has 6 sides, and looks like a hexagon
        elif op == 3:
            drone.cw(80) # the sun
        elif op == 4:
            drone.cw(1) # really slow circle
        elif op == 5:
            drone.cw(10) #cylinder start
            drone.up(100)
            drone.cw(10)
            drone.forward(10)
            drone.down(100) #cylinder end
        elif op == 6:
            drone.set_speed(0xFFFFFFFF) # rocket - set speed
            drone.up(1000000000000000) #rocket - go up
        elif op == 7:
            drone.right(100)
        elif op == 8:
            drone.forward(100)
            drone.cw(90)
        elif op == 9:
            drone.cw(100)
        op = 9
        #
        #
        #
        #
        #
        #
        #
        #
        #
        #
        #
        #

        #if keyboard.read_key() == "w": 
         #  drone.forward(1) # this is the key detection.
        #drone.flip('f')
        i = i+1



def manual():
    while True:
        cmd = str(input(f"STUD-D6@{sys.argv[1]} ~ C:/Drone/main.deb $ "))
        
        if cmd == "w" :
            drone.forward(10)
        elif cmd == "a" :
            drone.left(10)
        elif cmd == "s" :
            drone.back(10)
        elif cmd == "d" :
            drone.right(10)
        elif cmd == "e" :
            break
        elif cmd == "q" :
            auto()
        elif cmd == "l" :
            drone.land()
        elif cmd == "t" :
            drone.takeoff()
        elif cmd == "c" :
            drone.cw(22)
        elif cmd == "ff" :
            drone.flip('f')
        elif cmd == "fb" :
            drone.flip('b')
        elif cmd == "ss" :
            drone.set_speed(int(input('speed: ')))
        elif cmd == "up" :
            drone.up(int(input('up: ')))
        elif cmd == "do" :
            drone.down(int(input('down: ')))
        
        
manual()

def sqr(s):
    for i in range(4):
        drone.forward(s)
        drone.cw(90)
def tri(s):
    for i in range(3):
        drone.forward(s)
        drone.cw(120)
def cir(h,a):
    for i in range(a):
        drone.cw(10) #cylinder start
        drone.up(h)
        drone.cw(10)
        drone.forward(10)
        drone.down(h) #cylinder end
#for i in range(2):
#    sqr(100)
#    drone.right(100)
#
#    cir(10, 18)
#    drone.right(100)

   