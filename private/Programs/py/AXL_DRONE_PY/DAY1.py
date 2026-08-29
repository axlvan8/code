#description
#DAY1.py
#import statements go here

import time

#define variables here

st = time.time()

#functions

def printWithTimestamp(msg):
    en = str(time.time() - st)
    print(f'[{en}] : {str(msg)}')


#main code

