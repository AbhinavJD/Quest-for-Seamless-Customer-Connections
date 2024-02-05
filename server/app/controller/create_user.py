from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from app.db.schemas import CreateUserScehma
from app.db import models

def encode_params_data(params_data):
    return jsonable_encoder(params_data)

def create_user(db: Session, user: CreateUserScehma):
    # Check if the user already exists based on some criteria (e.g., username or email)
    existing_user = db.query(models.User).filter(models.User.employee_id == user["employee_id"]).first()

    if existing_user:
        # Handle the case when the user already exists
        return False
    else:
        # Create a new user
        _user = models.User(**user)
        db.add(_user)
        db.commit()
        db.refresh(_user)
        return True
