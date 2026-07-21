from fastapi import HTTPException
from sqlalchemy.orm import Session, joinedload

from app.models.doctor import Doctor
from app.models.appointment import Appointment
from app.schemas.doctor import DoctorCreate, DoctorUpdate



# Create Doctor Profile
def create_doctor(
    data: DoctorCreate,
    current_user: dict,
    db: Session
):
    # Only doctor can create profile
    if current_user["role"] != "doctor":
        raise HTTPException(
            status_code=403,
            detail="Only Doctor can create profile"
        )

    # Check existing profile
    doctor = db.query(Doctor).filter(
        Doctor.user_id == current_user["id"]
    ).first()

    if doctor:

        raise HTTPException(
            status_code=400,
            detail="Doctor profile already exists"
        )

    new_doctor = Doctor(
        user_id=current_user["id"],
        specialization=data.specialization,
        experience=data.experience,
        qualification=data.qualification
    )

    db.add(new_doctor)
    db.commit()
    db.refresh(new_doctor)

    return {

        "message":"Doctor Profile Created Successfully",

        "data":new_doctor

    }





# Get Logged In Doctor Profile
def get_doctor(
    current_user: dict,
    db: Session
):

    doctor = db.query(Doctor)\
        .options(joinedload(Doctor.user))\
        .filter(
            Doctor.user_id == current_user["id"]
        ).first()
    if not doctor:

        raise HTTPException(
            status_code=404,
            detail="Doctor profile not found"
        )



    return {

        "id":doctor.id,
        # User Table Data
        "name":doctor.user.name,
        "email":doctor.user.email,
        "address":doctor.user.address,

        # Doctor Table Data

        "specialization":doctor.specialization,

        "experience":doctor.experience,

        "qualification":doctor.qualification

    }


def get_all_doctors( current_user: dict,db: Session):

    doctors = db.query(Doctor)\
        .options(joinedload(Doctor.user))\
        .all()


    result = []


    for doctor in doctors:

        result.append({

            "id": doctor.id,

            "name": doctor.user.name,

            "specialization": doctor.specialization

        })


    return result
# Update Doctor Profile
def update_doctor(
    data: DoctorUpdate,
    current_user: dict,
    db: Session
):

    try:

        doctor = db.query(Doctor)\
            .options(joinedload(Doctor.user))\
            .filter(
                Doctor.user_id == current_user["id"]
            ).first()


        if not doctor:
            raise HTTPException(
                status_code=404,
                detail="Doctor profile not found"
            )


        # User Model Update
        if doctor.user:
            doctor.user.name = data.name
            doctor.user.address = data.address


        # Doctor Model Update
        doctor.specialization = data.specialization
        doctor.experience = data.experience
        doctor.qualification = data.qualification


        db.commit()
        db.refresh(doctor)


        return {
            "message":"Doctor Profile Updated Successfully"
        }


    except HTTPException:
        raise


    except Exception as e:

        db.rollback()

        print("UPDATE DOCTOR ERROR:", e)

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )



# Delete Doctor Profile
def delete_doctor(
    current_user: dict,
    db: Session
):


    doctor = db.query(Doctor).filter(
        Doctor.user_id == current_user["id"]
    ).first()



    if not doctor:

        raise HTTPException(
            status_code=404,
            detail="Doctor profile not found"
        )
    # Delete appointments first

    db.query(Appointment).filter(
        Appointment.doctor_id == doctor.id
    ).delete()
    # Delete doctor profile

    db.delete(doctor)
    db.commit()
    return {

        "message":"Doctor Profile Deleted Successfully"

    }