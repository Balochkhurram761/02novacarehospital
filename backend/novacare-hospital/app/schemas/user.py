from pydantic import BaseModel , EmailStr


class create_user(BaseModel):
    id :int
    name:str
    email:EmailStr
    password:str
    address:str
    role:str

    class Config:
        form_attributes=True


class Login_user(BaseModel):
    
    email:EmailStr
    password:str