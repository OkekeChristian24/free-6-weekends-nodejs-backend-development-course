/*
====== CLASSES AND OBJECTS ======
Class: A blueprint or template for creating objects. 
It defines the properties (attributes) and behaviors (methods) that objects of that class will have.
Object: An instance of a class. It is a concrete entity created from the class blueprint, 
possessing its own unique set of attribute values.
*/
// Class
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old`);
    }
}

const person1 = new Person("Alice", 25);
person1.greet(); // Hi, I'm Alice and I'm 25 years old

// Object literal
const person2 = {
    name: "Lucy",
    age: 27,
    greet: function () {
        console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old`);
    },
};
person2.greet(); // Hi, I'm Lucy and I'm 27 years old

// Constructor function
function Person(age, name) {
    this.name = name;
    this.age = age;
}
const person3 = new Person(45, "Martha");
console.log(person3.name); // "Martha"
console.log(person3.age); // 45

// Every time you call new Person(), the constructor runs.
// this keyword refers to the current object instance inside a class or function.

// === Private, Public, Static, and Non-static Fields and Methods ===
class MathUtils {
    static PI = 3.14159; // Public static property

    static #secretConstant = 42; // Private static property

    // Public static method
    static circleArea(radius) {
        return this.PI * radius ** 2;
    }

    // Private static method
    static #addSecret(value) {
        return value + this.#secretConstant;
    }

    // Public instance method using private static
    computeSecret(value) {
        return MathUtils.#addSecret(value); // Accessible internally
    }
}

console.log(MathUtils.PI); // 3.14159
console.log(MathUtils.circleArea(5)); // 78.53975
// console.log(MathUtils.#secretConstant); // This throws SyntaxError error

const utils = new MathUtils();
console.log(utils.computeSecret(10)); // 52
utils.PI; // Undefined (not on instance)

// === this Keyword ===
// <--- Global Context --->
console.log(this); // {}
// On Browser, this keyword refers to windows object.

// <--- Inside an Object Method --->
// When this is used inside an object’s method, it refers to the object that called the method.
const user = {
    name: "Alice",
    greet() {
        console.log(`Hi, I'm ${this.name}`);
    },
};

user.greet(); // "Hi, I'm Alice"
const admin = { name: "Bob", greet: user.greet };
admin.greet(); // "Hi, I'm Bob"

// <--- Standalone Function (Non-Method) --->
function showThis() {
    console.log(this);
}

showThis(); // this refers to global (Node.js) in non-strict mode

("use strict");
function showThis() {
    console.log(this);
}

showThis(); // this is undefined in strict mode

// <--- Inside a Constructor Function or Class --->
// When you use new, this refers to the newly created object instance as demonstrated above.

// <--- Arrow Functions (Lexical this) --->
// Arrow functions do not have their own this.
// Instead, they capture this from the parent (lexical) scope.
// In the example below, this refers to the global scope.
const car = {
    make: "Benz",
    startEngine: () => {
        console.log(`The ${this.make} engine has started`);
    },
    displayInfo: () => {
        console.log(`${this.make}`);
    },
};

car.displayInfo(); // undefined

// <--- Using call, bind, and apply --->
// bind(): Returns a new function with this permanently set.
const person = { name: "Alice" };

function greet() {
    console.log(this.name);
}

const boundGreet = greet.bind(person);
boundGreet(); // Alice

// call(): Calls the function immediately, setting this manually.
function greet() {
    console.log(`Hello, ${this.name}`);
}

const newUser = { name: "Alice" };
greet.call(newUser); // Hello, Alice

/* 
=== OOP Concepts ===
Inheritance, Encapsulation, Abstraction, Polymorphism
*/

// <--- Inheritance --->
// Inheritance allows one class to reuse and extend another class’s properties and methods.
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`${this.name} makes a sound`);
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name); // call parent constructor
        this.breed = breed;
    }

    speak() {
        console.log(`${this.name} barks`);
    }
}

const dog = new Dog("Rex", "Labrador");
dog.speak(); // Rex barks

// extends makes Dog inherit from Animal.
// super() calls the parent class constructor or methods.
// Child classes can override or extend parent methods.

// <--- Encapsulation --->
// Encapsulation means restricting direct access to some of an object’s internal data.
// Use Private fields (#) or Getters and setters
class BankAccount {
    #balance = 0; // private property

    deposit(amount) {
        this.#balance += amount;
    }

    // You can name it any name
    get balance() {
        return this.#balance;
    }

    // You can name it any name
    set balance(value) {
        this.#balance = value;
    }
}

const acc = new BankAccount();
acc.deposit(500);
console.log(acc.balance); // 500
acc.balance = 1000;
console.log(acc.balance); // 1000
// console.log(acc.#balance); // It throws SyntaxError because its a private field

// <--- Abstraction --->
// Abstraction means hiding complexity and exposing only what’s necessary.
// You can do this using methods that expose only essential functionality.
class CoffeeMachine {
    #waterLevel = 0;

    fillWater(amount) {
        this.#waterLevel += amount;
    }

    #boilWater() {
        console.log("Boiling water...");
    }

    makeCoffee() {
        if (this.#waterLevel > 0) {
            this.#boilWater();
            console.log("Coffee ready!");
        } else {
            console.log("Please fill water first!");
        }
    }
}

const machine = new CoffeeMachine();
machine.fillWater(2);
machine.makeCoffee();
// Boiling water...
// Coffee ready!

// <--- Polymorphism --->
// Polymorphism means many forms — the same method name behaves differently depending on the object.
// Child classes can override parent class methods
class Animal {
    speak() {
        console.log("Makes random sound");
    }
}

class Cat extends Animal {
    speak() {
        console.log("Meow");
    }
}

class Dog extends Animal {
    speak() {
        console.log("Woof");
    }
}

const myCat = new Cat();
const myDog = new Dog();
const myAnimal = new Animal();
myCat.speak(); // "Meow"
myDog.speak(); // "Woof"
myAnimal.speak(); // Makes random sound
