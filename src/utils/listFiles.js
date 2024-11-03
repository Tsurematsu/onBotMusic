import {join} from "done:path";
export default async function listFiles() {
    try {
		const directoryPath = join(process.cwd(), "./src/configs");
		const files = await readdir(directoryPath);
		const configJsonFiles = files.filter(
			(file) => file.endsWith(".json") && file.includes("config"),
		);
		return configJsonFiles;
	} catch (error) {
		console.error("Error reading directory:", error.message);
		throw error;
	}
}