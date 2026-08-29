import json
import os

MEMORY_FILE = "memory.json"

if os.path.exists(MEMORY_FILE):
    with open(MEMORY_FILE, "r") as f:
        memory = json.load(f)
else:
    memory = {}

while True:
    user = input("You: ")

    if user.lower() == "quit":
        break

    if user in memory:
        print("AI:", memory[user])
    else:
        reply = input("Teach me how I should respond: ")
        memory[user] = reply
        print("AI: Thanks! I'll remember that.")

with open(MEMORY_FILE, "w") as f:
    json.dump(memory, f, indent=4)