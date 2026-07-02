<!-- What is Abstract class -->

# Abstract = Adhoora (Incomplete)

An abstract class is a non-instantiable class that serves as a blueprint for other classes by providing shared implementation and declaring abstract methods that derived classes must implement.

Abstract class ek aisi class hoti hai jiska object nahi ban sakta. Ye dusri classes ke liye ek blueprint ka kaam karti hai. Isme common code diya ja sakta hai aur kuch methods sirf declare kiye ja sakte hain, jinhe inherit karne wali har child class ko implement karna zaruri hota hai.

# Key Points
Cannot create an object of an abstract class.
Declared using the abstract keyword.
Can have both:
Concrete (implemented) methods
Abstract (unimplemented) methods
A subclass must implement all abstract methods unless it is also abstract.
Used to define a common blueprint for related classes.


# Explanation of Definition

1. "An abstract class is a non-instantiable class"

Meaning:
Abstract class ka object (instance) nahi bana sakte.

abstract class Animal {}

const a = new Animal(); // ❌ Error

Kyun?

Kyuki abstract class sirf ek base/template hoti hai. Ye complete class nahi hoti.


2. "that serves as a blueprint for other classes"
Meaning:

Abstract class dusri classes ke liye blueprint (naksha) ka kaam karti hai.

Jaise ghar banane se pehle architect blueprint banata hai.

        Animal
           |
   ----------------
   |              |
  Dog            Cat

Yaha Animal batata hai ki har animal ke paas ye cheezein hongi.

abstract class Animal {
  name: string;

  abstract makeSound(): void;
}

Ab jitni bhi classes Animal ko inherit karengi unhe isi blueprint ko follow karna padega.

3. "by providing shared implementation"
Meaning:

Jo code sabhi child classes me same hai, usse abstract class me ek hi baar likh dete hain.

Example:

abstract class Animal {
  sleep() {
    console.log("Sleeping...");
  }
}

Ab Dog, Cat, Lion sab automatically sleep() use kar sakte hain.

class Dog extends Animal {
  makeSound() {
    console.log("Bark");
  }
}

class Cat extends Animal {
  makeSound() {
    console.log("Meow");
  }
}

Dog aur Cat dono ko sleep() dobara likhne ki zarurat nahi.

Yahi hota hai shared implementation.

4. "and declaring abstract methods"
Meaning:

Abstract class kuch methods sirf declare karti hai.

Implementation nahi deti.

abstract class Animal {
    abstract makeSound(): void;
}

Yaha sirf bola gaya hai ki

"Har Animal ke paas makeSound() method hona chahiye."

Lekin kaise sound karega, ye nahi bataya.

5. "that derived classes must implement"
Meaning:

Jo bhi class Animal ko inherit karegi usse makeSound() banana hi padega.

class Dog extends Animal {
    makeSound() {
        console.log("Bark");
    }
}
class Cat extends Animal {
    makeSound() {
        console.log("Meow");
    }
}

Agar implement nahi kiya to error aayega.

<!-- Interface vs Abstract Class -->

| Interface                          | Abstract Class                                     |
| ---------------------------------- | -------------------------------------------------- |
| Sirf contract batati hai           | Contract + implementation dono de sakti hai        |
| Koi implementation nahi (normally) | Kuch methods complete, kuch abstract ho sakti hain |
| Variables ki value nahi hoti       | Variables aur constructor dono ho sakte hain       |
| `implements` use hota hai          | `extends` use hota hai                             |
