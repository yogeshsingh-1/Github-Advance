# Installation & Setup

## Python Version check

python --version

## Install FastAPI & Uvicorn

- pip list
- pip install fastapi
- pip install uvicorn

```
Uvicorn Python ka ek ASGI web server hai. Simple words mein, ye tumhari Python web application ko run karne aur HTTP requests handle karne ka kaam karta hai.

Uvicorn ASGI server hai.

ASGI = Asynchronous Server Gateway Interface

FastAPI  → API banata hai
Uvicorn  → API ko server par chalata hai

Ye Python application aur web server ke beech ek standard interface provide karta hai.

Agar tum FastAPI use kar rahe ho, to Uvicorn bahut commonly use hota hai.

Run Our Application :
uvicorn main:app --reload
```

# Venv setup

venv Python ka built-in tool hai jo project ke liye isolated environment create karta hai, jisme us project ke Python packages aur dependencies independently manage ki ja sakti hain.

## Create venv
python -m venv venv

python      → Python interpreter
-m venv     → venv module run karo
venv        → environment ka naam

## Activate on Windows
venv\Scripts\activate

```Activate hone ke baad terminal mein usually:
(venv) C:\project>
```


## Phir packages install karo
pip install fastapi uvicorn

Ye packages sirf us virtual environment mein install honge.

## Deactivate
deactivate

- Project Setup
- First FastAPI app


# Note :-

phle virtaul environent ko install karo .
phir ushe virtaul environment ko activate karo .
phir use virtual environment mai local package install karo. 