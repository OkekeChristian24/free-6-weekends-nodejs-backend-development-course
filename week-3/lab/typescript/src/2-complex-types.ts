/*
====== COMPLEX TYPES ======
These are Arrays, Tuples, Enums
*/

// Array Types: Arrays store multiple values of the same type.
let scores: number[] = [90, 85, 70];
let mixedArray: (string | number | boolean)[] = [
    "hello",
    123,
    true,
    "world",
    456,
];

// Tuple Types: Tuples store a fixed number of elements with specific types.
let user: [string, number] = ["Alice", 30]; // Tuple

// Enum Types: Enums define a set of named constants.
enum Direction {
    Up,
    Down,
    Left,
    Right,
}

let move: Direction = Direction.Up; // 0
enum Status {
    SUCCESS = "success",
    ERROR = "error",
}
console.log(move);
console.log(Status.SUCCESS);
