from sqlalchemy import Column, String, Integer, ForeignKey
from app.dbConnection.database import Base


class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    phone = Column(Integer)
    age = Column(Integer)
