from jose import jwt 
from datetime import datetime ,timedelta , UTC
from dotenv import load_dotenv
import os
load_dotenv()

SECRET_KEY =os.getenv("SECRET_KEY")
ALGORITHM =os.getenv("ALGORITHM")


def create_token(data:dict):
    to_encode=data.copy()

    expire=datetime.now(UTC) + timedelta(minutes=30)

    to_encode.update({
        "exp":expire
    })

    encode_jwt=jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM

    )
    return encode_jwt


