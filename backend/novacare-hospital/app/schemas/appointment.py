from pydantic import BaseModel
from datetime import date, time


class AppointmentCreate(BaseModel):
    doctor_id: int
    reason: str
    appointment_date: date
    appointment_time: time


class AppointmentUpdate(BaseModel):
    status: str


class AppointmentResponse(BaseModel):
    id: int
    patient_id: int
    doctor_id: int
    reason: str
    appointment_date: date
    appointment_time: time
    status: str

    class Config:
        from_attributes = True