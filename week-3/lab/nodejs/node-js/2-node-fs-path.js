const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "data", "example.txt");

fs.writeFileSync(filePath, "Hello Node!"); // Writes content to the file
console.log(fs.readFileSync(filePath, "utf8")); // Reads file content

const json = {
    name: "Christian Okeke",
    career: "Software Engineer",
};
const filePathJson = path.join(__dirname, "data", "person.json");
fs.writeFileSync(filePathJson, JSON.stringify(json)); // Writes content to the file
console.log(JSON.parse(fs.readFileSync(filePathJson, "utf8"))); // Reads file content

// File Streams
const bigFilePath = path.join(__dirname, "data", "bigfile.txt");
const readStream = fs.createReadStream(bigFilePath, "utf8");
readStream.on("data", (chunk) => {
    console.log("Received:", chunk.length);
});
