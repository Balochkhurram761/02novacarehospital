from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dbConnection.database import get_db
from app.schemas.patient import PatientCreate, PatientUpdate 
from app.services.patient_service import (
    create_patient,
    get_all_patients,
    get_single_patient,
    update_patient,
    delete_patient,
    get_patient
)
from app.utils.role_based import role_required

router = APIRouter()


# Create Patient Profile
@router.post("/create")
def create_patient_route(
    patient: PatientCreate,
    current_user=Depends(role_required(["patient"])),
    db: Session = Depends(get_db)
):
    return create_patient(patient, current_user, db)


# Get All Patients (Admin)
@router.get("/")
def get_all_patients_route(
    current_user=Depends(role_required(["admin"])),
    db: Session = Depends(get_db)
):
    return get_all_patients(db)
@router.get("/profile")
def patient_profile(
    current_user=Depends(role_required(['patient'])),
    db:Session=Depends(get_db)
):
    return get_patient(current_user,db)


# Get Single Patient
@router.get("/{id}")
def get_single_patient_route(
    id: int,
    current_user=Depends(role_required(["admin", "doctor", "patient"])),
    db: Session = Depends(get_db)
):
    return get_single_patient(id, db, current_user)


# Update Patient
@router.put("/update/{id}")
def update_patient_route(
    id: int,
    patient: PatientUpdate,
    current_user=Depends(role_required(["patient"])),
    db: Session = Depends(get_db)
):
    return update_patient(id, patient, db)


# Delete Patient
@router.delete("/profile")
def delete(
    current_user=Depends(role_required(["patient"])),
    db: Session = Depends(get_db)
):
    return delete_patient(current_user, db)