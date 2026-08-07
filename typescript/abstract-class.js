"use strict";
class Animal {
    // Concrete (implemented) methods
    sleep() {
        console.log("Sleeping...");
    }
}
const animal = new Animal(); // Cannot create an instance of an abstract class.
// Kyun?
// Kyuki abstract class incomplete hoti hai.
// Next Example
class Animal1 {
    constructor(name) {
        this.name = name;
    }
    sleep() {
        console.log("Sleeping...");
    }
}
class Dog extends Animal1 {
    makeSound() {
        console.log("Bark");
    }
}
const dog = new Dog("Tommy");
dog.makeSound();
dog.sleep();
// Kab use kare?
// Interface → Jab sirf contract define karna ho.
// Abstract class → Jab kuch common implementation sab child classes ko deni ho, aur kuch methods ko child classes se implement karwana ho.
// Backend projects (Express + TypeScript)
// Interfaces: Service aur Repository contracts define karne ke liye.
// Abstract classes: Common database logic, logging, validation, caching, ya shared helper methods ko reuse karne ke liye.
