import Generate24Game
import Check24
import Contains24
import Solve24Game

numbers = Generate24Game.Generate()

correct = False

def command(cmd):
    if "(" in cmd or ")" in cmd or "+" in cmd or "-" in cmd or "*" in cmd or "/" in cmd:
        raise Exception("Something went wrong")
    elif cmd == "give-up":
        print(Solve24Game.Solve(numbers))
        return True
    elif cmd == "help":
        print("Commands:")
        print("  help - Show this help message")
        print("  exit - Exit the program")
        print("  show - Show a solution to the 24 game for the current numbers")
        print("  give-up - Show a solution to the 24 game for the current numbers")
        return False
    elif cmd == "exit":
        return True
    elif cmd == "show":
        print(Solve24Game.Solve(numbers))
        return False
    else:
        print("Invalid command. Please try again.")
        return False        
    

while(not correct):
    userExpression=input(f"Enter an expression that includes {numbers} and evaluates to 24: ")
    try:
        if Check24.Check(userExpression) == True:
            if Contains24.Check(numbers, userExpression) == True:
                print("Correct!")
                break
            else:
                print("Does not contain the four numbers.")
        else:
            try:
                correct = command(userExpression)
            except Exception as e:
                print("The expression does not evaluate to 24.")
    except Exception as e:
        correct = command(userExpression)


