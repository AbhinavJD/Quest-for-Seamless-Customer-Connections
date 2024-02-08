import os
from fastapi import FastAPI
from fastapi import Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.db.database import SessionLocal, engine
from app.db import models
from app.db.schemas import CreateUserScehma, LoginUserScehma, ForgotPasswordUserScehma, Response
from app.controller import create_user, login_user, forgot_password
from jose import JWTError
from fastapi.responses import JSONResponse
from app.firebase import firebase


models.Base.metadata.create_all(bind=engine)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
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

async def get_current_user(token: str = Depends(oauth2_scheme), db=Depends(db)):
    credential_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                         detail="Could not validate credentials", headers={"WWW-Authenticate": "Bearer"})
    try:
        payload = login_user.decode_token(token)
        # print("payload----------->", payload)
        email: str = payload.get("sub")
        if email is None:
            raise credential_exception

        token_data = models.TokenData(email=email)
    except JWTError:
        raise credential_exception

    user = login_user.get_user(db, email=token_data.email)
    if user is None:
        raise credential_exception
    return user

async def get_current_active_user(user: models.UserInDB = Depends(get_current_user)):
    if user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")

    return user

@app.post("/login", response_model=models.Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db = Depends(db)):
    user = login_user.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Incorrect username or password", headers={"WWW-Authenticate": "Bearer"})

    access_token_expires = login_user.get_token_time()
    access_token = login_user.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires)
    token_type = "bearer"  # You can define the token type as needed

    response_content = {
        "access_token": access_token,
        "token_type": token_type,
        "status": "ok",
        "code": "200",
        "message": "Login Successfull, Please Wait Redirecting!",
    }

    return JSONResponse(content=response_content)


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
                        status="failed",
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

@app.get("/users")
async def read_users_me(user: models.User = Depends(get_current_active_user)):
    user_dict = {
        "employee_id": user.employee_id,
        "email": user.email,
        "user_name": user.user_name,
    }
    return user_dict


@app.get("/users/newChat")
async def create_new_chat(user: models.User = Depends(get_current_active_user)):
    chat_id = firebase.add_new_chat(user.email)
    if chat_id:
        return Response(code="200",
                        status="ok",
                        message="New Chat Created!",
                        result={"newChatId": chat_id}).dict(exclude_none=True)
    else:
        return Response(code="500",
                        status="ok",
                        message="Something Went Wrong!").dict(exclude_none=True)
