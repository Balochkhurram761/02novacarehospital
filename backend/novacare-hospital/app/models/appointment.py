from sqlalchemy import Column, Integer, String, ForeignKey, Date, Time
from sqlalchemy.orm import relationship
from app.dbConnection.database import Base

class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)

    patient_id = Column(Integer, ForeignKey("patients.id"))
    doctor_id = Column(Integer, ForeignKey("doctors.id"))

    appointment_date = Column(Date)
    appointment_time = Column(Time)
    reason = Column(String(255))
    status = Column(String(30), default="Pending")

    patient = relationship("Patient", back_populates="appointments")
    doctor = relationship("Doctor", back_populates="appointments")