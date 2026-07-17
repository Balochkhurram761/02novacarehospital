from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.user import create_user ,Login_user
from app.models.user import User
from app.utils.hash import password_hash,compare_hash
from app.utils.token import create_token

def register_user(user: create_user, db: Session):

    try:
        hashed_password = password_hash(user.password)

        new_user = User(
            name=user.name,
            email=user.email,
            password=hashed_password,
            address=user.address,
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return new_user

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
    
def login_user(user: Login_user, db: Session):
    try:
        db_users = db.query(User).filter(User.email == user.email).first()

        if not db_users:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        compare_password = compare_hash(
            user.password,
            db_users.password
        )

        if not compare_password:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )
        token = create_token(
            {
                "sub": db_users.email,
                "id":db_users.id,
                "role": db_users.role
            }
        )

        return {
            "message": "Login successful",
            "access_token": token,
            "token_type": "bearer"
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )