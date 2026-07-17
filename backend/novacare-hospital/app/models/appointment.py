from sqlalchemy import Column, String, Integer, ForeignKey
from app.dbConnection.database import Base

class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, autoincrement=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    doctor_id = Column(Integer, ForeignKey("doctors.id"))
    problem = Column(String(255))
    status = Column(String(30), default="pending")