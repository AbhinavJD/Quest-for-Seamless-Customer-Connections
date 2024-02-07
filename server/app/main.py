import os
from fastapi import FastAPI
from fastapi import Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.db.database import SessionLocal, engine
from app.db import models
from app.db.schemas import CreateUserScehma, LoginUserScehma, ForgotPasswordUserScehma, Response
from app.controller import create_user, login_user, forgot_password

models.Base.metadata.create_all(bind=engine)

# creating instance for fast api
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



@app.post("/login", response_model=models.Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db = Depends(db)):
    user = login_user.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Incorrect username or password", headers={"WWW-Authenticate": "Bearer"})

    access_token_expires = login_user.get_token_time()
    access_token = login_user.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}

    # data = login_user.encode_params_data(login_cred)
    # is_login = login_user.login_user(db, login_data=data)
    # if is_login:
    #     # create jwt token
    #     encoded_token = login_user.get_token(data)
    #     return Response(code="200",
    #                     status="ok",
    #                     message="Successfully Logged In, Please wait redirecting!",
    #                     result= {"token":encoded_token}).dict(exclude_none=True)
    # else:
    #     return Response(code="422",
    #                     status="ok",
    #                     message="Invalid User ID or Password!").dict(exclude_none=True)


@app.post("/create")
async def register_user(create_user_details: CreateUserScehma, db = Depends(db)):
    data = create_user.encode_params_data(create_user_details)
    is_added = create_user.create_user(db, user = data)
    if is_added:
        return Response(code= "200",
                        status= "ok",
                        message= "user added successfully!").dict(exclude_none=True)
    else:
        return Response(code="422",
                        status="ok",
                        message="user already exists!").dict(exclude_none=True)

@app.post("/forgot")
async def login(forgot_cred: ForgotPasswordUserScehma, db = Depends(db)):
    data = forgot_password.encode_params_data(forgot_cred)
    is_password_updated = forgot_password.forgot_user_password(db, login_data=data)
    if is_password_updated:

        return Response(code="200",
                        status="ok",
                        message="Password Updated Successfully, Please wait redirecting!",
                       ).dict(exclude_none=True)
    else:
        return Response(code="422",
                        status="ok",
                        message="User Doesnot Exits, Please Try With Registered Email!").dict(exclude_none=True)
