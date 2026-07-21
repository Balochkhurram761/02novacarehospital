from pydantic import BaseModel,EmailStr

class PatientCreate(BaseModel):
    phone:str
    age:int

class PatientUpdate(BaseModel):
    name:str
    address:str
    phone:str
    age:int

class PatientResponse(BaseModel):
    id:int
    user_id:int
    phone:str
    age:int

    class Config:
        from_attributes=True