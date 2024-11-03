import path from "node:path";
import { writeFile } from "node:fs/promises";
/**
 * Writes a JavaScript object to a JSON file.
 *
 * @param {string} filePath - The path to the file where the JSON data should be written (absolute path).
 * @param {Object} data - The JavaScript object to be converted to JSON and written to the file.
 * @param {function(Error):void} [errorCallBack] - Optional callback function to handle errors.
 */
export default function writeJson(filePath, data, errorCallBack) {
    const patchFile = path.join(getPath(), filePath);
    try {
        const jsonData = JSON.stringify(data, null, 2);
        writeFile(patchFile, jsonData, "utf8");
        return;
    } catch (error) {
        if (errorCallBack) {
            errorCallBack(error);
        }
    }
}

function getPath() {
    const originalFunc = Error.prepareStackTrace;
    let callerFile;
	const err = new Error();
	let currentFile;
	// biome-ignore lint/complexity/useArrowFunction: <explanation>
	Error.prepareStackTrace = function (_, stack) { return stack; };
	currentFile = err.stack.shift().getFileName();
	while (err.stack.length) {
		callerFile = err.stack.shift().getFileName();
		if (currentFile !== callerFile) break;
	}
    Error.prepareStackTrace = originalFunc;
	if (callerFile.startsWith('file://')) {
        callerFile = callerFile.substring(8);
    }
    return path.dirname(callerFile);
}