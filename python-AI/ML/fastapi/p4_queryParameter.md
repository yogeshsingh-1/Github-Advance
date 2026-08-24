# Query Parameters

Extra data after url is called query parameter.
that is start with question mark(?).
and all are pair with key and value.

url

```
?name=yogesh&age=30&email=yogeshs368@gmail.com
```

- Optional Parameters
  ?name=yogesh&age=30&email=yogeshs368@gmail.com

- Default Values

  @app.get("/users")
  def getUser(name :str=None):
  return {"name":name}

- Multiple query params

  @app.get("/product")
  def getUser(productName :str=None,price:int =None):
  return {"ProductName":productName,"Price":price}

- Interview Questions
