import os
from fastapi import FastAPI
from fastapi import Depends
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import SessionLocal, engine
from app.db import models
from app.db.schemas import CreateUserScehma, LoginUserScehma, Response
from app.controller import create_user, login_user

models.Base.metadata.create_all(bind=engine)


app = FastAPI()
origins = [
    '*'
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

def db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

@app.post("/login")
async def login(login_cred: LoginUserScehma, db = Depends(db)):
    data = login_user.encode_params_data(login_cred)
    is_login = login_user.login_user(db, login_data=data)
    if is_login:
        # create jwt token
        encoded_token = login_user.get_token(data)
        return Response(code="200",
                        status="ok",
                        message="Successfully Logged In, Please wait redirecting!",
                        result= {"token":encoded_token}).dict(exclude_none=True)
    else:
        return Response(code="422",
                        status="ok",
                        message="Invalid User ID or Password!").dict(exclude_none=True)


@app.post("/create")
async def register_user(create_user_details: CreateUserScehma, db = Depends(db)):
    data = create_user.encode_params_data(create_user_details)
    print(data)
    is_added = create_user.create_user(db, user = data)
    if is_added:
        return Response(code= "200",
                        status= "ok",
                        message= "user added successfully!").dict(exclude_none=True)
    else:
        return Response(code="422",
                        status="ok",
                        message="user already exists!").dict(exclude_none=True)
