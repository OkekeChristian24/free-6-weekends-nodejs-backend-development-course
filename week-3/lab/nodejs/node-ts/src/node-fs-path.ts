import * as fs from "fs";
import * as path from "path";

// Define file paths
const filePath: string = path.join(__dirname, "data", "example.txt");

// Write and read a text file
fs.writeFileSync(filePath, "Hello Node!"); // Writes content to the file
console.log(fs.readFileSync(filePath, "utf8")); // Reads file content

// Define a JSON object
interface Person {
    name: string;
    career: string;
}

const json: Person = {
    name: "Christian Okeke",
    career: "Software Engineer",
};

const filePathJson: string = path.join(__dirname, "data", "person.json");

// Write JSON data to file
fs.writeFileSync(filePathJson, JSON.stringify(json, null, 2)); // Pretty-print JSON

// Read JSON data from file
const jsonData: string = fs.readFileSync(filePathJson, "utf8");
const parsedData: Person = JSON.parse(jsonData);
console.log(parsedData);

// File Streams
const bigFilePath: string = path.join(__dirname, "data", "bigfile.txt");

// Create a readable stream
const readStream: fs.ReadStream = fs.createReadStream(bigFilePath, {
    encoding: "utf8",
});

// Listen for data chunks
readStream.on("data", (chunk: string | Buffer<ArrayBufferLike>) => {
    console.log("Received:", chunk.length);
});

// Handle stream errors (important in TS)
readStream.on("error", (err: NodeJS.ErrnoException) => {
    console.error("Error reading file:", err.message);
});
