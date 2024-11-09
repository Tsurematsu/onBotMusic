import fs, { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

/**
 * Reads a JSON file and parses its content.
 *
 * @param {string} filePath - The path.
 * @param {function} [errorCallBack] - Optional callback function to handle errors.
 * @returns {Promise<Object>} The parsed JSON data.
 */

// biome-ignore lint/style/useDefaultParameterLast: <explanation>
export async function readJson(filePath = '', errorCallBack = (e) => {}) {
	// const patchFile = path.join(getPath(), filePath);
	const patchFile = filePath
	try {
		const jsonData = await readFile(patchFile, 'utf8')
		const data = JSON.parse(jsonData)
		return data
	} catch (error) {
		if (errorCallBack) {
			errorCallBack(error)
		} else {
			return error.message
		}
	}
}

/**
 * Deletes a JSON file at the specified path.
 * @param {string} pathFile - The relative path to the JSON file to delete.
 * @returns {Promise<void>} A promise that resolves when the file is deleted.
 */
export function deleteJson(pathFile) {
	// const modulePath = getPath();
	// const filePath = path.join(modulePath, pathFile);
	const filePath = pathFile
	return new Promise((resolve, reject) => {
		fs.unlink(filePath, (err) => {
			if (err) {
				reject(err)
			} else {
				resolve('')
			}
		})
	})
}

/**
 * Writes a JavaScript object to a JSON file.
 *
 * @param {string} filePath - The path to the file where the JSON data should be written (absolute path).
 * @param {Object} data - The JavaScript object to be converted to JSON and written to the file.
 * @param {function(Error):void} [errorCallBack] - Optional callback function to handle errors.
 */
// biome-ignore lint/style/useDefaultParameterLast: <explanation>
export function writeJson(filePath = '', data, errorCallBack = (e) => {}) {
	// const patchFile = path.join(getPath(), filePath);
	const patchFile = filePath
	try {
		const jsonData = JSON.stringify(data)
		writeFile(patchFile, jsonData, 'utf8')
		return
	} catch (error) {
		if (errorCallBack) {
			errorCallBack(error)
		}
	}
}

/**
 * Verifies the existence and content of a JSON file at the specified file path.
 * If the file or its directory does not exist, it creates them.
 * If the file is empty, it returns a status indicating the file has no data.
 *
 * @param {string} filePath - The path to the JSON file to verify.
 * @returns {Promise<{status: boolean, msg: string, error: Error|null, data: object}>}
 * An object containing the status of the file verification, a message, and any error encountered.
 */
export async function verifyJsonFile(filePath) {
	try {
		const dir = path.dirname(filePath)
		await mkdir(dir, { recursive: true })
		if (!(await existsSync(filePath))) {
			await writeFile(filePath, '{}', 'utf8')
			return { status: false, msg: 'not exist file', error: null, data: {} }
		}
	} catch (error) {
		console.log(error)
		await writeFile(filePath, '{}', 'utf8')
		return {
			status: false,
			msg: 'not exist file and error',
			error: error,
			data: {},
		}
	}
	const inObject = await readFile(filePath, 'utf8')
	if (inObject === '{}') {
		return { status: false, msg: 'empty file, no data', error: null, data: {} }
	}
	return {
		status: true,
		msg: 'file exist and has data',
		error: null,
		data: inObject,
	}
}
