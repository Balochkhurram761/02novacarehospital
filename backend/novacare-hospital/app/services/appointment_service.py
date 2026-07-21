from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.appointment import Appointment
from app.models.patient import Patient
from app.models.doctor import Doctor
from app.schemas.appointment import AppointmentCreate, AppointmentUpdate
from sqlalchemy.orm import joinedload


# ==========================
# Create Appointment
# ==========================
def create_appointment(
    data: AppointmentCreate,
    current_user: dict,
    db: Session
):
    # Only Patient can book appointment
    if current_user["role"] != "patient":
        raise HTTPException(
            status_code=403,
            detail="Only patients can book appointments"
        )

    # Check Patient Profile
    patient = db.query(Patient).filter(
        Patient.user_id == current_user["id"]
    ).first()

    if not patient:
        raise HTTPException(
            status_code=404,
            detail="Patient profile not found"
        )

    # Check Doctor
    doctor = db.query(Doctor).filter(
        Doctor.id == data.doctor_id
    ).first()

    if not doctor:
        raise HTTPException(
            status_code=404,
            detail="Doctor not found"
        )

    # Create Appointment
    appointment = Appointment(
        patient_id=patient.id,
        doctor_id=data.doctor_id,
        appointment_date=data.appointment_date,
        appointment_time=data.appointment_time,
        reason=data.reason,
        status="Pending"
    )

    db.add(appointment)
    db.commit()
    db.refresh(appointment)

    return {
        "message": "Appointment Booked Successfully",
        "data": appointment
    }


# ==========================
# Get All Appointments
# ==========================
def get_all_appointments(db: Session):

    appointments = db.query(Appointment)\
        .options(
            joinedload(Appointment.doctor)
            .joinedload(Doctor.user)
        )\
        .all()


    result = []


    for appointment in appointments:

        result.append({

            "id": appointment.id,

            "doctor": {

                "id": appointment.doctor.id,

                "name": appointment.doctor.user.name,

                "specialization": appointment.doctor.specialization

            } if appointment.doctor else None,


            "appointment_date": appointment.appointment_date,

            "appointment_time": appointment.appointment_time,

            "reason": appointment.reason,

            "status": appointment.status

        })


    return result


# ==========================
# Update Appointment Status
# ==========================
def update_appointment(
    id: int,
    data: AppointmentUpdate,
    db: Session
):

    appointment = db.query(Appointment).filter(
        Appointment.id == id
    ).first()

    if not appointment:
        raise HTTPException(
            status_code=404,
            detail="Appointment not found"
        )

    appointment.status = data.status

    db.commit()
    db.refresh(appointment)

    return {
        "message": "Appointment Updated Successfully",
        "data": appointment
    }


# ==========================
# Delete Appointment
# ==========================
def delete_appointment(
    id: int,
    db: Session
):

    appointment = db.query(Appointment).filter(
        Appointment.id == id
    ).first()

    if not appointment:
        raise HTTPException(
            status_code=404,
            detail="Appointment not found"
        )

    db.delete(appointment)
    db.commit()

    return {
        "message": "Appointment Deleted Successfully"
    }