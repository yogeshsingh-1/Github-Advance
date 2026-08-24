from fastapi import FastAPI
from 
app = FastAPI()

@app.get("/")
def home():
    return {"Name":"Yogesh Singh"}


@app.post("/user-create")
def createUser(user:dict):
    return {"msg":"User-Created","data":user}