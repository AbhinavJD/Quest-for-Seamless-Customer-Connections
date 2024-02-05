from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from app.db.schemas import ForgotPasswordUserScehma
from app.db import models



def encode_params_data(params_data):
    return jsonable_encoder(params_data)

def forgot_user_password(db, login_data: ForgotPasswordUserScehma):
    # Check if the user already exists based on email
    existing_user = db.query(models.User).filter(models.User.email == login_data["email"]).first()

    if existing_user:
        # User exists, update the password, and return the updated user
        existing_user.password = login_data['password']
        db.commit()
        db.refresh(existing_user)
        return existing_user
    else:
        # User does not exist or password does not match, return False
        return False

