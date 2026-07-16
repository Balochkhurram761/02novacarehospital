from fastapi import FastAPI

app = FastAPI(
    title="NovaCare Hospital API",
    description="Backend API for NovaCare Hospital Management System",
    version="1.0.0"
)


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