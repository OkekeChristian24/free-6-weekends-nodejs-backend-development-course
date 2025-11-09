/*
====== INTERFACES ======
Interfaces define the structure (shape) of objects.
*/

interface User {
    readonly id: number;
    name: string;
    age: number;
}

const newUser: User = { id: 123, name: "Alice", age: 25 };
newUser.name = "John";
// newUser.id = 456 // Error: Cannot assign to 'id' because it is a read-only property.

interface Employee extends User {
    departmet: string;
    salary: number;
    isAdmin?: boolean; // optional
}

const newEmployee: Employee = {
    id: 789,
    name: "Mark",
    age: 31,
    departmet: "IT",
    salary: 100000,
};
