# Pydantic Kya Hai?

Pydantic ek Python library hai jo data validation aur settings management ke liye use hoti hai. Yeh Python type hints ka use karke data ko validate aur parse karti hai.

Note -> Python library , data validation ,

from pydantic import BaseModel

# Pydantic mein BaseModel Kya Hai?

BaseModel Pydantic ka sabse important class hai. Yeh ek base class hai jisse aap apne data models banate hain. Isko aap ek template ya blueprint samajh sakte hain jo aapke data ki structure aur validation rules define karta hai.

Simple Explanation:
BaseModel ek contract hai jo batata hai:

- Aapka data kaisa dikhna chahiye (structure)

- Har field ka type kya hona chahiye (int, str, list, etc.)

- Kya rules follow karne hain (validation)


# Pydantic Models

- Create Schemas
- Data Validation (Data ki correctness check karna)
- Automatic Validation
- Nested Models
- Optional Fields aur Default Values
- Custom Validation
- Dist vs Pydantic
- Interview Questions
