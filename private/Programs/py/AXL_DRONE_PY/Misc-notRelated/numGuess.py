import random

num = random.randint(1,100)
guessed = False

while guessed != num: 
    guess = float(input("Guess a number: "))
    if guess == num :
        guessed = True
        break
    elif guess < num :
        print("too low")
    elif guess > num :
        print("too high")
    else :
        print("something has gone wrong")
        break
    
      