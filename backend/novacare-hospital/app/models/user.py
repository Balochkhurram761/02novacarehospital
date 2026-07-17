from sqlalchemy import Column, String, Integer
from app.dbConnection.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100))
    email = Column(String(100), unique=True)
    password = Column(String(255))
    address = Column(String(255))
    role = Column(String(20) , default="admin")