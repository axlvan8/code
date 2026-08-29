import time
import random as rand
import math
score=0
repeat = int(input("repeat:"))
t=time.time()
for i in range(1,repeat+1):
    num1=rand.randint(1,10)
    num2=rand.randint(1,10)
    etype=rand.randint(1,4) 
    if etype==1: # +
        p=float(input(f'{i}: {num1}+{num2}='))
        ans=num1+num2
    if etype==2: # -
        if num2>num1:
            temp = num2
            num2 = num1
            num1 = temp
        
        p=float(input(f'{i}: {num1}-{num2}='))
        ans=num1-num2
    if etype==3: # *
        p=float(input(f'{i}: {num1}*{num2}='))
        ans=num1*num2
    if etype==4: # /
        if num2>num1:
            temp = num2
            num2 = num1
            num1 = temp
        
        temp = num1
        num1 = num1 * num2
        ans = num1 / num2

        p=float(input(f'{i}: {num1}/{num2}='))
        

    #if etype == 5:
    #    p=input(f'{num1}^{num2}=')
    #    ans=num1^num2
    if p==ans:
        score=score+1
        
    else:
        score=score-1
q=time.time()
m=q-t
print(f"score: {score}/{repeat}, time(secs) taken on test: {m}, average time on each question: {m/repeat}")

























