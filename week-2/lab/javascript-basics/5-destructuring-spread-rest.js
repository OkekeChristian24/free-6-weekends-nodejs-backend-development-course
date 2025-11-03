/*
====== DESTRUCTURING ======
Destructuring allows you to unpack values from arrays or objects into variables easily.
- Array Destructuring
- Object Destructuring

Spread expands elements from an array or object.
- Spread in Arrays
- Spread in Objects

Rest operator looks the same as spread (...), but it does the opposite —
it collects multiple elements into one.
- Rest in Arrays
- Rest in Objects
- Rest in Function Parameters

*/
// === Array Destructuring ===
const numbers = [10, 20, 30];

// old way
const a = numbers[0];
const b = numbers[1];
console.log(a);
console.log(b);

// Destructing
const [x, y, z] = numbers;
console.log(x);
console.log(y);
console.log(z);

// Skip value
const [first, , third] = [1, 2, 3];
console.log(first, third); // 1 3

const [value1 = 5, value2 = 10] = [7];
console.log(value1, value2); // 7 10

// === Object Destructuring ===
const user = { name: "Alice", age: 25 };

// old way
const name = user.name;
// const age = user.age;

// destructuring way
const { name: userName, age } = user;
console.log(userName); // Alice
console.log(age); // 25

const person = {
    name: "John",
    address: { city: "Lagos", country: "Nigeria" },
};

const {
    address: { city },
} = person;
console.log(city); // Lagos

/*
====== Spread Operator (...) ======
Spread expands elements from an array or object.
*/

// === Spread in Arrays ===
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4]

// === Spread in Objects ===
const lady = { name: "Alice", age: 25, gender: "female" };
const updated = { ...user, city: "Abuja" };
console.log(updated); // { name: "Alice", age: 25, gender: "female", city: "Abuja" }

/*
====== Rest Operator (...) ======
The rest operator looks the same as spread (...), but it does the opposite —
it collects multiple elements into one.
*/
// === Rest in Arrays
const [firstNum, ...otherNums] = [10, 20, 30, 40];
console.log(firstNum); // 10
console.log(otherNums); // [20, 30, 40]

// === Rest in Objects ===
const { name: ladyName, ...info } = {
    name: "Alice",
    age: 25,
    gender: "female",
    city: "Lagos",
};
console.log(ladyName); // Alice
console.log(info); // { age: 25, gender: "female", city: "Lagos" }

// Rest in Function Parameters
function sum(...numbers) {
    return numbers.reduce((acc, n) => acc + n, 0);
}
console.log(sum(1, 2)); // 3
console.log(sum(1, 2, 3, 4)); // 10
