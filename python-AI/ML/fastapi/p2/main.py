from fastapi import FastAPI
from controller.homeController import HomeController

app = FastAPI()

controller = HomeController()


@app.get("/")
def root():
    return controller.root()


@app.get("/home")
def home():
    return controller.home()


@app.get("/service")
def service():
    return controller.service()


@app.get("/contact")
def contact():
    return controller.contact()


@app.get("/about")
def about():
    return controller.about()