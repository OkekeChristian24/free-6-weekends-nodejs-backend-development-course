/*
====== CONTROL FLOW ======
- if 
- switch 
- loops (for, for...of, for...in, while, do...while) 
- Error handling: try, catch, finally, throw
*/

// === if Statement ===
// The if statement executes a block of code only if a condition is true.
let age = 20;
if (age >= 18) {
    console.log("You are an adult.");
} else {
    console.log("You are a minor.");
}
// Output: You are an adult.

let score = 75;
if (score >= 90) {
    console.log("Grade A");
} else if (score >= 70) {
    console.log("Grade B");
} else {
    console.log("Grade C");
}

// === switch Statement ===
// The switch statement is cleaner when you have many possible values for one variable.
let day = "Monday";

switch (day) {
    case "Monday":
        console.log("Start of the week!");
        break;
    case "Friday":
        console.log("Almost weekend!");
        break;
    case "Saturday":
    case "Sunday":
        console.log("Weekend 🎉");
        break;
    default:
        console.log("Midweek day.");
}

// === Loops ===
// <--- for loop --->
for (let i = 1; i <= 5; i++) {
    console.log("Count:", i);
}
// Output: 1 2 3 4 5

// <--- for...of loop --->
const fruits = ["apple", "banana", "orange"];
for (const fruit of fruits) {
    console.log(fruit);
}
// Output: apple banana orange

// <--- for...in loop --->
const person = { name: "Snow", age: 29, city: "Lagos" };
for (const key in person) {
    console.log(`${key} - ${person[key]}`);
}

// <--- while loop --->
let count = 1;
while (count <= 3) {
    console.log("Hello", count);
    count++;
}
// Output: Hello 1 Hello 2 Hello 3

// <--- do...while loop --->
let num = 0;
do {
    console.log("Number:", num);
    num++;
} while (num < 3);

// Output: Number: 0 Number: 1 Number: 2

// === try...catch...finally ===
function goodFunction() {
    console.log("Executes without a problem");
}

function badFunction() {
    throw new Error("An error occurred!");
}

try {
    // goodFunction();
    badFunction();
} catch (err) {
    console.log("Caught error:", err.message);
} finally {
    console.log("Cleanup done!");
}

// Output:
// Caught error: An error occurred!
// Cleanup done!
