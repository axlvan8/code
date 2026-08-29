import random
import Solve24Game


def Generate():
    complete = False
    while not complete:
        numbers = [random.randint(1, 9) for _ in range(4)]
        if Solve24Game.Solve(numbers):
            complete = True
            return numbers
        