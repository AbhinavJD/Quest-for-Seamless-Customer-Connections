
from sqlalchemy import Boolean, Column, Integer, String
from pydantic import BaseModel
from .database import Base
# from sqlalchemy.orm import validates
# from passlib.hash import bcrypt  # Install with: pip install passlib


class User(Base):
    __tablename__ = "UsersDetails"

    employee_id = Column(Integer, primary_key=True, )
    email = Column(String(100), unique=True)
    user_name = Column(String(100), default='user')
    is_active = Column(Boolean, default=False)
    password = Column(String, default='password')

class Token(BaseModel):
    access_token: str
    token_type:str

class TokenData(BaseModel):
    email: str

class UserInDB(BaseModel):
    hashed_password: str
