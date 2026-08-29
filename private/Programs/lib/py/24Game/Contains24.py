




def Check(nums, expr):
    
   
    for character in expr:
        if not character == "(" and not character == ")" and not character == "+" and not character == "-" and not character == "*" and not character == "/" and not character == " ":
            
            
            if int(character) not in nums:
                print(f"{character} is not in {nums}.")
                return False
            
            

        
    """for item in used:
        if not item in nums:
            return False"""
    return True

