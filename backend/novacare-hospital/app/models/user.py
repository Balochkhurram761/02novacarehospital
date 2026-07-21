from sqlalchemy import Column, String, Integer ,Boolean
from app.dbConnection.database import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100))
    email = Column(String(100), unique=True)
    password = Column(String(255))
    address = Column(String(255))
    role = Column(String(20) , default="admin")
    is_approved = Column(Boolean, default=False)

    doctor = relationship(
        "Doctor",
        back_populates="user",
        uselist=False
    )
    
    patient=relationship(
        "Patient",
        back_populates="user",
        uselist=False
    )
    