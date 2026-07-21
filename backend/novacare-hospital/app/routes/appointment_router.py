from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dbConnection.database import get_db
from app.schemas.appointment import AppointmentCreate, AppointmentUpdate

from app.services.appointment_service import (
    create_appointment,
    get_all_appointments,
    get_all_appointments,
    update_appointment,
    delete_appointment,
)

from app.utils.role_based import role_required


router = APIRouter()


# Patient Create Appointment
@router.post("/create")
def create_appointment_route(
    appointment: AppointmentCreate,
    current_user=Depends(role_required(["patient"])),
    db: Session = Depends(get_db)
):
    return create_appointment(
        appointment,
        current_user,
        db
    )


# Admin Get All
@router.get("/")
def get_all_appointments_route(
    current_user=Depends(role_required(["admin", "patient"])),
    db: Session = Depends(get_db)
):
    return get_all_appointments(db)



# Single Appointment
@router.get("/{id}")
def get_single_appointment_route(
    id:int,
    current_user=Depends(
        role_required(["admin","doctor","patient"])
    ),
    db:Session=Depends(get_db)
):
    return get_single_appointment(id,db)



# Doctor/Admin Update Status
@router.put("/update/{id}")
def update_appointment_route(
    id:int,
    appointment:AppointmentUpdate,
    current_user=Depends(
        role_required(["doctor","admin"])
    ),
    db:Session=Depends(get_db)
):
    return update_appointment(
        id,
        appointment,
        db
    )


# Delete
@router.delete("/delete/{id}")
def delete_appointment_route(
    id:int,
    current_user=Depends(
        role_required(["admin"])
    ),
    db:Session=Depends(get_db)
):
    return delete_appointment(
        id,
        db
    )