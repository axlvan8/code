


import operator

ops = {
    '+': operator.add,
    '-': operator.sub,
    '*': operator.mul,
    '/': operator.truediv
}

answers=set()
def Solve(numbers):
    """
    This function takes a list of four numbers and returns a string that represents a valid mathematical expression
    that evaluates to 24 using those numbers. If no such expression exists, it returns None.
    """
    from itertools import permutations, product

    # Define the operations
    operations = ['+', '-', '*', '/']

    # Generate all permutations of the numbers
    for nums in permutations(numbers):
        # Generate all combinations of operations
        for ops in product(operations, repeat=3):
            # Create expressions with different parenthesis placements
            expressions = [
                f"(({nums[0]} {ops[0]} {nums[1]}) {ops[1]} {nums[2]}) {ops[2]} {nums[3]}",
                f"({nums[0]} {ops[0]} ({nums[1]} {ops[1]} {nums[2]})) {ops[2]} {nums[3]}",
                f"{nums[0]} {ops[0]} (({nums[1]} {ops[1]} {nums[2]}) {ops[2]} {nums[3]})",
                f"{nums[0]} {ops[0]} ({nums[1]} {ops[1]} ({nums[2]} {ops[2]} {nums[3]}))",
                f"({nums[0]} {ops[0]} {nums[1]}) {ops[1]} ({nums[2]} {ops[2]} {nums[3]})"
            ]

            # Evaluate each expression and check if it equals 24
            
            for expr in expressions:
                try:
                    if eval(expr) == 24:
                        return expr
                        #answers.add(expr)
                except ZeroDivisionError:
                    continue

    return None




