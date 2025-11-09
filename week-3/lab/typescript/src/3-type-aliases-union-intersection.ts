/*
====== TYPE ALIASES ======
Type aliases give custom names to complex types.
*/
type ID = string | number; // Union type
type Point = { x: number; y: number };

let userId: ID = "PASS1201";
userId = 5000; // Works
let coord: Point = { x: 10, y: 20 };

// Union Types (|)
let id: string | number = "PASS1201";
id = 1201; // Works

function printId(id: string | number) {
    console.log(`ID: ${id}`);
}
printId(300);
printId("PASS2001");

// Intersection Types (&)
type Person = { name: string };
type Contact = { phone: string };
type Employee = Person & Contact; // Intersection
type AnyType = Person | Contact;

const emp: Employee = { name: "John", phone: "12345" };

// Literal Types
let status: 200 | 404 | 500 = 200; // You can't assign any value to status that is not 200, 404, or 500
// status = 400; // Error: Type '400' is not assignable to type '200 | 404 | 500'.

let direction: "left" | "right" | "up" | "down" = "left";
// direction = "side"; // Error: Type '"side"' is not assignable to type '"left" | "right" | "up" | "down"'.
