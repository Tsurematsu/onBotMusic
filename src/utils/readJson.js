import path from "node:path";
import { readFile } from "node:fs/promises";
/**
 * Reads a JSON file and parses its content.
 *
 * @param {string} filePath - The path.
 * @param {function} [errorCallBack] - Optional callback function to handle errors.
 * @returns {Promise<Object>} The parsed JSON data.
 */

// biome-ignore lint/style/useDefaultParameterLast: <explanation>
export  default async function readJson(filePath="", errorCallBack) {
	const patchFile = path.join(getPath(), filePath);
    try {
		const jsonData = await readFile(patchFile, "utf8");
		const data = JSON.parse(jsonData);
		return data;
	} catch (error) {
        if (errorCallBack) {
            errorCallBack(error);
        }else{
			return error.message;
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
	
	// file:///C:/Users/danie/Documents/localUtils/onBotMusic/src
    if (callerFile.startsWith('file://')) {
        callerFile = callerFile.substring(8);
    }
    // C:/Users/danie/Documents/localUtils/onBotMusic/src
	return path.dirname(callerFile);
}