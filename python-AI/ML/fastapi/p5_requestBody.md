# Request Body

It is a payload that can send by client or frontend.

A request body is the data or payload sent by the client to the server as part of an HTTP request.

Note -> A dictionary (dict) in Python is a built-in data structure that stores data in key-value pairs.

- JSON input handling

- POST request
- Intro to Pydantic

```
Pydantic Python ki ek library hai jo mainly data validation, parsing aur data structures define karne ke liye use hoti hai.
```

from pydantic import BaseModel

class User(BaseModel):
    name: str
    email: str
    age: int


- Interview Questions
