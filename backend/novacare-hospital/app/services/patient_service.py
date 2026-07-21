from fastapi import HTTPException
from sqlalchemy.orm import Session, joinedload
from app.models.patient import Patient
from app.schemas.patient import PatientCreate, PatientUpdate
from app.models.appointment import Appointment

def create_patient(patient: PatientCreate,current_user: dict,db: Session):

    if current_user["role"]!="patient":
        raise HTTPException(status_code=403,detail="Only Patient can create profile")

    patient_db=db.query(Patient).filter(Patient.user_id==current_user["id"]).first()

    if patient_db:
        raise HTTPException(status_code=400,detail="Patient profile already exists")

    new_patient=Patient(
        user_id=current_user["id"],
        phone=patient.phone,
        age=patient.age
    )

    db.add(new_patient)

    try:
        db.commit()
        db.refresh(new_patient)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400,detail=str(e))

    return {
        "message":"Patient Profile Created Successfully",
        "data":new_patient
    }


def get_all_patients(db: Session):

    patients=db.query(Patient).options(joinedload(Patient.user)).all()

    result=[]

    for patient in patients:
        result.append({
            "id":patient.id,
            "name":patient.user.name,
            "email":patient.user.email,
            "address":patient.user.address,
            "phone":patient.phone,
            "age":patient.age
        })

    return result


def get_single_patient(id:int,db:Session,current_user:dict):

    patient=db.query(Patient)\
        .options(joinedload(Patient.user))\
        .filter(Patient.id==id).first()

    if not patient:
        raise HTTPException(status_code=404,detail="Patient Not Found")

    if current_user["role"]=="patient":
        if patient.user_id!=current_user["id"]:
            raise HTTPException(status_code=403,detail="Access Denied")

    return {
        "id":patient.id,
        "name":patient.user.name,
        "email":patient.user.email,
        "address":patient.user.address,
        "phone":patient.phone,
        "age":patient.age
    }

def get_patient(
    current_user:dict,
    db:Session
):

    try:

        patient=db.query(Patient)\
            .options(joinedload(Patient.user))\
            .filter(Patient.user_id==current_user["id"])\
            .first()

        if not patient:
            raise HTTPException(
                status_code=404,
                detail="Patient profile not found"
            )

        return{
            "id":patient.id,
            "name":patient.user.name,
            "email":patient.user.email,
            "address":patient.user.address,
            "phone":patient.phone,
            "age":patient.age
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error: {str(e)}"
        )


def update_patient(id:int,patient:PatientUpdate,db:Session):

    patient_db=db.query(Patient)\
        .options(joinedload(Patient.user))\
        .filter(Patient.id==id).first()

    if not patient_db:
        raise HTTPException(status_code=404,detail="Patient Not Found")

    try:
        patient_db.user.name=patient.name
        patient_db.user.address=patient.address
        patient_db.phone=patient.phone
        patient_db.age=patient.age

        db.commit()
        db.refresh(patient_db)

        return{
            "message":"Patient Updated Successfully",
            "data":{
                "id":patient_db.id,
                "name":patient_db.user.name,
                "email":patient_db.user.email,
                "address":patient_db.user.address,
                "phone":patient_db.phone,
                "age":patient_db.age
            }
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400,detail=str(e))

def delete_patient(
    current_user: dict,
    db: Session
):
    patient = db.query(Patient).filter(
        Patient.user_id == current_user["id"]
    ).first()

    if not patient:
        raise HTTPException(
            status_code=404,
            detail="Patient profile not found"
        )

    # Delete appointments first
    db.query(Appointment).filter(
        Appointment.patient_id == patient.id
    ).delete()

    # Delete patient profile
    db.delete(patient)
    db.commit()

    return {
        "message": "Patient Profile Deleted Successfully"
    }