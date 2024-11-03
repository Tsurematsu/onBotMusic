import { join } from "path";
export default async function readJson(filePath, errorCallBack) {
    try {
		const filePath = join(process.cwd(), fileName);
		const jsonData = await readFile(filePath, "utf8");
		const data = JSON.parse(jsonData);
		return data;
	} catch (error) {
        if (errorCallBack) {
            errorCallBack(error);
        }
	}
}