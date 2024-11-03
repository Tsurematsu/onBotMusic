/**
 * Writes a JavaScript object to a JSON file.
 *
 * @param {string} filePath - The path to the file where the JSON data should be written (absolute path).
 * @param {Object} data - The JavaScript object to be converted to JSON and written to the file.
 * @param {function(Error):void} [errorCallBack] - Optional callback function to handle errors.
 */
export default function writeJson(filePath, data, errorCallBack) {
    try {
        const jsonData = JSON.stringify(data, null, 2);
        writeFile(filePath, jsonData, "utf8");
    } catch (error) {
        if (errorCallBack) {
            errorCallBack(error);
        }
    }
}