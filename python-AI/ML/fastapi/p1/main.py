from fastapi import FastAPI
from "./navController.py" import Nav
app = FastAPI()

@app.get("/")
def home():
    return {"msg" :"Hello world"}
    # return "Hello world"
    
    
@app.get("/api/v1")
def v1Route():
    return {"msg": "V1 Routes"}