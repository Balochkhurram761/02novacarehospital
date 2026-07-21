from fastapi import FastAPI
from app.dbConnection.database import Base , Engine 
from app.models.user import User
from app.models.doctor import Doctor
from app.models.patient import Patient
from app.models.appointment import Appointment
from app.routes.user_routes import router as auth_router
from fastapi.middleware.cors import CORSMiddleware
from app.routes.doctor_router import router as doctor_router
from app.routes.patient_router import router as patient_router
from app.routes.appointment_router import router as appointment_router



app = FastAPI(
    title="NovaCare Hospital API",
    description="Backend API for NovaCare Hospital Management System",
    
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Base.metadata.create_all(bind=Engine)


app.include_router(auth_router, prefix="/users", tags=["Users"])
app.include_router(doctor_router , prefix="/doctors", tags=["Doctors"] )
app.include_router(patient_router, prefix="/patient", tags=["Patients"])
app.include_router(appointment_router ,   prefix="/appointments",tags=["Appointments"])

@app.get("/")
def root():
    return {
        "message": "Welcome to NovaCare Hospital API"
    }

@app.get("/health")
def health_check():
    return {
        "status": "OK",
        "message": "Server is running successfully"
    }