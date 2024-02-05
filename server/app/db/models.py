
from sqlalchemy import Boolean, Column, Integer, String

from .database import Base
# from sqlalchemy.orm import validates
# from passlib.hash import bcrypt  # Install with: pip install passlib


class User(Base):
    __tablename__ = "UsersDetails"

    employee_id = Column(Integer, primary_key=True, )
    email = Column(String(100), unique=True)
    username = Column(String(100), default='user')
    is_active = Column(Boolean, default=False)
    password = Column(String, default='password')

    # @validates('password')
    # def validate_password_hash(self, key, password):
    #     # Hash the password using bcrypt before storing it
    #     return bcrypt.hash(password)
