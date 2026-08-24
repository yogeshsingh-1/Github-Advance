from fastapi import FastAPI
app = FastAPI()


@app.get("/users")
def getUser(name :str=None):
    return {"name":name}

@app.get("/product")
def getUser(productName :str=None,price:int =None):
    return {"ProductName":productName,"Price":price}