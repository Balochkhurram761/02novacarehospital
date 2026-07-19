from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dbConnection.database import get_db
from app.schemas.user import create_user, Login_user, get_user
from app.services.auth_service import (
    register_user,
    login_user,
    user_get,
    user_delete,
    get_singleuser,
    user_update
)
from app.utils.role_based import role_required

router = APIRouter()


# Register
@router.post("/register")
def register(
    user: create_user,
    db: Session = Depends(get_db)
):
    return register_user(user, db)


# Login
@router.post("/login")
def login(
    user: Login_user,
    db: Session = Depends(get_db)
):
    return login_user(user, db)
@router.post("/admin/register")
def register(
    user: create_user,
    db: Session = Depends(get_db),
    current_user=Depends(role_required(["admin"]))
):
    return register_user(user, db)



# Get All Users
@router.get("/users")
def get_alluser(
    db: Session = Depends(get_db),
    current_user=Depends(role_required(["admin"]))
):
    return user_get(db)


# Get Single User
@router.get("/{id}")
def get_single(
    id: int,
    db: Session = Depends(get_db),
    current_user=Depends(role_required(["admin"]))
):
    return get_singleuser(id, db)


# Update User
@router.put("/update/{id}")
def update(
    id: int,
    user: get_user,
    db: Session = Depends(get_db),
    current_user=Depends(role_required(["admin"]))
):
    return user_update(id, user, db)


# Delete User
@router.delete("/delete/{id}")
def delete_user(
    id: int,
    db: Session = Depends(get_db),
    current_user=Depends(role_required(["admin"]))
):
    return user_delete(id, db)