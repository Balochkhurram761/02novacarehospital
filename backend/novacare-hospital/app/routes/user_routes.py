from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.dbConnection.database import get_db
from app.schemas.user import create_user,Login_user
from app.services.auth_service import register_user, login_user

router = APIRouter()

@router.post("/register")
def register(
    user: create_user,
    db: Session = Depends(get_db)
):
    return register_user(user, db)

@router.post("/Login")
def Login(
    user:Login_user ,
    db: Session = Depends(get_db)
):
    return login_user(user, db)