from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os
from urllib.parse import quote_plus


load_dotenv()


user_name = os.getenv("user_name")
password = os.getenv("password")
host = os.getenv("host")
port = os.getenv("port")
database = os.getenv("database")


if not all([user_name, password,  host, port, database]):
    raise Exception("Database credentials missing in .env")



Password=quote_plus(password)

DATABASE_URL = (
    f"mysql+pymysql://{user_name}:{Password}@{host}:{port}/{database}"
)




Engine = create_engine(
    DATABASE_URL,
    echo=True
)


Base = declarative_base()


SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=Engine
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()