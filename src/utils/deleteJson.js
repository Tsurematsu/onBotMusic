import fs from 'node:fs';
import path from 'node:path';

export default function deleteJson(pathFile) {
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