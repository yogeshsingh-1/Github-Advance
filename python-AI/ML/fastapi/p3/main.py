from fastapi import FastAPI
app= FastAPI()

@app.get("/users/{id}")
def home(id:int):
    return {"user_id" : id}

@app.get("/users/name/{name}")
def home(name:str):
    return {"user_id" : name}
     