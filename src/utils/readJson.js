/**
 * Reads a JSON file and parses its content.
 *
 * @param {string} filePath - The path absolute route.
 * @param {function} [errorCallBack] - Optional callback function to handle errors.
 * @returns {Promise<Object>} The parsed JSON data.
 */
export default async function readJson(filePath, errorCallBack) {
    try {
		const jsonData = await readFile(filePath, "utf8");
		const data = JSON.parse(jsonData);
		return data;
	} catch (error) {
        if (errorCallBack) {
            errorCallBack(error);
        }
	}
}