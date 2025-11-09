import { promises as fs } from "fs";

async function readFile(): Promise<void> {
    try {
        const data: string = await fs.readFile("example.txt", "utf8");
        console.log(data);
    } catch (error) {
        console.error("Error reading file:", error);
    }
}

readFile();
