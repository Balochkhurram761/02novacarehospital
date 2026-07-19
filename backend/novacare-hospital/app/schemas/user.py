from pydantic import BaseModel , EmailStr
from typing import Optional


class create_user(BaseModel): 
    name:str
    email:EmailStr
    password:str
    address:str
    role:str="admin"

    class Config:
        form_attributes=True


class Login_user(BaseModel):
    
    email:EmailStr
    password:str


class get_user(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    role: Optional[str] = None

    class Config:
        form_attributes=True
