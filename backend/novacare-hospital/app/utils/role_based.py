from fastapi import Depends, HTTPException, status
from app.utils.secuirty import get_current_user

def role_required(allowed_roles: list):

    def checker(current_user=Depends(get_current_user)):

        # Check role
        if current_user["role"] not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access Denied"
            )

        # Admin ko approval ki zarurat nahi
        if current_user["role"] != "admin" and not current_user["approved"]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Your account is waiting for admin approval."
            )

        return current_user

    return checker