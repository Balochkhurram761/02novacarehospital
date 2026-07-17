from passlib.context import CryptContext

context_password = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

def password_hash(password: str):
    return context_password.hash(password)


def compare_hash(plain_password: str, hashed_password: str):
    return context_password.verify(plain_password, hashed_password)

