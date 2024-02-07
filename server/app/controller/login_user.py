from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
import jwt
from app.db.schemas import LoginUserScehma
from app.db import models
from datetime import datetime, timedelta
from passlib.context import CryptContext
# need to move in env
SECRET_KEY = "questceadar2024"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# def encode_params_data(params_data):
#     return jsonable_encoder(params_data)

# def login_user(db, login_data: LoginUserScehma):
#     # Check if the user already exists based on email
#     existing_user = db.query(models.User).filter(models.User.email == login_data["email"]).first()

#     if existing_user and existing_user.password == login_data["password"]:
#         # User exists and password matches, return the user
#         return existing_user
#     else:
#         # User does not exist or password does not match, return False
#         return False

# def get_token(request_data):
#     token = jwt.encode(request_data, SECRET_KET, algorithm=ALGORITHM)
#     return token
def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_user(db, email: str):
    # Check if the user already exists based on email
    existing_user = db.query(models.User).filter(models.User.email == email).first()
    if existing_user:
        return existing_user

def authenticate_user(db, email: str, password: str):
    user = get_user(db, email)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False

    return user

def get_token_time():
    return timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

def create_access_token(data: dict, expires_delta: timedelta or None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
