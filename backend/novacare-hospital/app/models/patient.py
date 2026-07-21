from sqlalchemy import Column, String, Integer, ForeignKey
from app.dbConnection.database import Base
from sqlalchemy.orm import relationship


class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id") , nullable=False, unique=True  )
    phone = Column(String)
    age = Column(Integer)


    user=relationship(
        "User",
        back_populates="patient"
    )
    appointments = relationship(
        "Appointment",
        back_populates="patient",
        cascade="all, delete"
    )
    

