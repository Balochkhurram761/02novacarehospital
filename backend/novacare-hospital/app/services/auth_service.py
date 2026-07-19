from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.user import create_user ,Login_user ,get_user
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
        if db_users.role != "admin":
            raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only Admin can login"
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
        
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
    


def user_get(db: Session):
    try:
        users = db.query(User).all()

        if not users:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Users not found"
            )

        return users

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
from fastapi import HTTPException, status

def get_singleuser(id: int, db: Session):
    try:
        user = db.query(User).filter(User.id == id).first()

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        return user

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

  
def user_update(id: int, user: get_user, db: Session):
    try:
        user_put = db.query(User).filter(User.id == id).first()

        if not user_put:
            raise HTTPException(
                status_code=404,
                detail="User not found"
            )

        # Sirf wahi field update hogi jo request me aayegi
        if user.name is not None:
            user_put.name = user.name

        if user.email is not None:
            user_put.email = user.email

        if user.address is not None:
            user_put.address = user.address

        if user.role is not None:
            user_put.role = user.role

        db.commit()
        db.refresh(user_put)

        return user_put

    except HTTPException:
        raise

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
def user_delete(id: int, db: Session):
    try:

        user = db.query(User).filter(User.id == id).first()

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        db.delete(user)
        db.commit()

        return {
            "message": "User deleted successfully"
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

def user_deleteall( user:get_user , db:Session):
    try:
        user_delete=db.query(User).all()
        if not user_delete:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="user not found"
            )
        
        
        
        db.delete(user_delete)
        
        db.commit()
        return {
            "message":"ALL user deleted succesfully"
        }


    
       
    except Exception as e:
        raise HTTPException(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail=str(e)

    )
    

