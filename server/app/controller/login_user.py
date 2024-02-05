from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
import jwt
from app.db.schemas import LoginUserScehma
from app.db import models

# need to move in env
SECRET_KET = "questceadar2024"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 800


def encode_params_data(params_data):
    return jsonable_encoder(params_data)

def login_user(db, login_data: LoginUserScehma):
    # Check if the user already exists based on email
    existing_user = db.query(models.User).filter(models.User.email == login_data["email"]).first()

    if existing_user and existing_user.password == login_data["password"]:
        # User exists and password matches, return the user
        return existing_user
    else:
        # User does not exist or password does not match, return False
        return False

def get_token(request_data):
    token = jwt.encode(request_data, SECRET_KET, algorithm=ALGORITHM)
    return token

