import path from "node:path";
import fs from 'node:fs';
import { readFile, writeFile } from "node:fs/promises";
/**
 * Reads a JSON file and parses its content.
 *
 * @param {string} filePath - The path.
 * @param {function} [errorCallBack] - Optional callback function to handle errors.
 * @returns {Promise<Object>} The parsed JSON data.
 */

// biome-ignore lint/style/useDefaultParameterLast: <explanation>
export async function readJson(filePath = "", errorCallBack) {
	const patchFile = path.join(getPath(), filePath);
	try {
		const jsonData = await readFile(patchFile, "utf8");
		const data = JSON.parse(jsonData);
		return data;
	} catch (error) {
		if (errorCallBack) {
			errorCallBack(error);
		} else {
			return error.message;
		}
	}
}

/**
 * Deletes a JSON file at the specified path.
 * @param {string} pathFile - The relative path to the JSON file to delete.
 * @returns {Promise<void>} A promise that resolves when the file is deleted.
 */
export function deleteJson(pathFile) {
	const modulePath = getPath();
	const filePath = path.join(modulePath, pathFile);
	return new Promise((resolve, reject) => {
		fs.unlink(filePath, (err) => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
}

/**
 * Writes a JavaScript object to a JSON file.
 *
 * @param {string} filePath - The path to the file where the JSON data should be written (absolute path).
 * @param {Object} data - The JavaScript object to be converted to JSON and written to the file.
 * @param {function(Error):void} [errorCallBack] - Optional callback function to handle errors.
 */
// biome-ignore lint/style/useDefaultParameterLast: <explanation>
export function writeJson(filePath = "", data, errorCallBack) {
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
	Error.prepareStackTrace = function (_, stack) {
		return stack;
	};
	currentFile = err.stack.shift().getFileName();
	while (err.stack.length) {
		callerFile = err.stack.shift().getFileName();
		if (currentFile !== callerFile) break;
	}
	Error.prepareStackTrace = originalFunc;
	if (callerFile.startsWith("file://")) {
		callerFile = callerFile.substring(8);
	}
	return path.dirname(callerFile);
}
