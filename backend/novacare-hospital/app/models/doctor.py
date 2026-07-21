from sqlalchemy import Column, String, Integer, ForeignKey
from app.dbConnection.database import Base
from sqlalchemy.orm import relationship


class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    specialization = Column(String(100))
    experience = Column(Integer)
    qualification=Column(String)
    
    user = relationship(
        "User",
        back_populates="doctor"
    )
    appointments = relationship(
        "Appointment",
        back_populates="doctor",
        cascade="all, delete"
    )