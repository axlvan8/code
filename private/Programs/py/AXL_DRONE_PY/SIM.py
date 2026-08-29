import uuid

def check_key(key):
    try:
        uuid.UUID(key)
        return True
    except ValueError:
        return False