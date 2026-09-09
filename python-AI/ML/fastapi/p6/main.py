from fastapi import FastAPI
from pydantic import BaseModel
app = FastAPI()

class Address(BaseModel):
    state:str
    city:str=None
    pincode:int

class User(BaseModel):
    name :str
    age:int=None
    email:str
    address:Address


def root():
    return {"message":"Root Routes"}

@app.get("/home")
def home():
    return {"message":"Home Routes"}


@app.post("/users")
def user(user:User):
    return {"msg":"User Created","data":user}
