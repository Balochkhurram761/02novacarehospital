from sqlalchemy import Column, String, Integer, ForeignKey
from app.dbConnection.database import Base


class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    specialization = Column(String(100))
    experience = Column(Integer)