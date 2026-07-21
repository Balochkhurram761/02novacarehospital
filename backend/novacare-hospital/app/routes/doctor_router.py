from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dbConnection.database import get_db
from app.schemas.doctor import DoctorCreate, DoctorUpdate
from app.services.auth_doctor import (
    create_doctor,
    get_doctor,
    update_doctor,
    delete_doctor,
    get_all_doctors
)

from app.utils.role_based import role_required

router = APIRouter()


# Create Doctor Profile
@router.post("/profile")
def create(
    doctor: DoctorCreate,
    current_user=Depends(role_required(["doctor"])),
    db: Session = Depends(get_db)
):
    return create_doctor(doctor, current_user, db)


# Get Logged In Doctor Profile
@router.get("/profile")
def get(
    current_user=Depends(role_required(["doctor"])),
    db: Session = Depends(get_db)
):
    return get_doctor(current_user, db)

@router.get("/all")
def get(
    current_user=Depends(role_required(["patient"])),
    db: Session = Depends(get_db)
):
    return get_all_doctors(current_user,db)

# Update Doctor Profile
@router.put("/profile")
def update(
    doctor: DoctorUpdate,
    current_user=Depends(role_required(["doctor"])),
    db: Session = Depends(get_db)
):
    return update_doctor(doctor, current_user, db)


# Delete Doctor Profile
@router.delete("/profile")
def delete(
    current_user=Depends(role_required(["doctor"])),
    db: Session = Depends(get_db)
):
    return delete_doctor(current_user, db)