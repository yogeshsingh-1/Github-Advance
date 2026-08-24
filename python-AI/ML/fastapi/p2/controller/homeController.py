class HomeController:

    def root(self):
        return {"message": "root route"}

    def home(self):
        return {"message": "home route"}

    def service(self):
        return {"message": "service route"}

    def contact(self):
        return {"message": "contact route"}

    def about(self):
        return {"message": "about route"}