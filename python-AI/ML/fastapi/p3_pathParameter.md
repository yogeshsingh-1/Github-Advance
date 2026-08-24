# Path Parameters

- Dynamic Routes
  `/home/:${id}`

EX:
@app.get("/users/{id}")
def home(id):
return {"user_id" : id}

- Data Types (int,str)

define dynamic route based on int and str and validate dynamic route based on datatype

def home(id:int):
return {"user_id" : id}

def home(id:str):
return {"user_id" : id}

- Validation Basic
- Interview Questions`
