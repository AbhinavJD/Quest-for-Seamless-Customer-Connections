from typing import List, Optional, Generic, TypeVar
from pydantic import BaseModel , Field
from pydantic.generics import GenericModel

T = TypeVar('T')


class CreateUserScehma(BaseModel):
    employee_id: int
    username: str
    email: str
    password: str

    class Config:
        orm_mode = True

class LoginUserScehma(BaseModel):

    email: str
    password: str

    class Config:
        orm_mode = True

class Response(GenericModel, Generic[T]):
    code: str
    status: str
    message: str
    result: Optional[T]
