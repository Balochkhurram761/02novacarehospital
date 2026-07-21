from pydantic import BaseModel

class DoctorCreate(BaseModel):
    specialization: str
    experience: int
    qualification:str


class DoctorUpdate(BaseModel):
    name:str
    address:str
    specialization: str
    experience: int
    qualification:str


class DoctorResponse(BaseModel):
    id: int
    user_id: int
    specialization: str
    experience: int
    qualification:int

    class Config:
        from_attributes = True