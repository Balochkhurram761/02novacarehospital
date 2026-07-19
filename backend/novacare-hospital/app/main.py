from fastapi import FastAPI
from app.dbConnection.database import Base , Engine 
from app.models.user import User
from app.models.doctor import Doctor
from app.models.patient import Patient
from app.models.appointment import Appointment
from app.routes.user_routes import router as auth_router
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI(
    title="NovaCare Hospital API",
    description="Backend API for NovaCare Hospital Management System",
    
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Base.metadata.create_all(bind=Engine)


app.include_router(auth_router, prefix="/users", tags=["Users"])

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