import path from 'node:path'
import { killDir, path_logs, path_runtime } from '../utils/cPath'
import { deleteJson, readJson, verifyJsonFile, writeJson } from '../utils/json'
export default class SystemConfig {
	local_path = {
		ApproveUsers: path.join(path_runtime, '/onBot/ApproveUsers.json'),
		logsUsers: path.join(path_logs, '/onBot/LogsUsers.json'),
	}
	approveUsers = []
	logsUsers = []
	async load() {
		const checkPathApprove = await verifyJsonFile(this.local_path.ApproveUsers)
		const checkPathLogUsers = await verifyJsonFile(this.local_path.logsUsers)
		if (checkPathApprove.status === false) {
			await writeJson(this.local_path.ApproveUsers, this.approveUsers)
		}
		if (checkPathLogUsers.status === false) {
			await writeJson(this.local_path.logsUsers, this.logsUsers)
		}
		this.approveUsers = await readJson(this.local_path.ApproveUsers)
		this.logsUsers = await readJson(this.local_path.logsUsers)
	}
	async save(newObject = null) {
		if (newObject !== null) {
			Object.assign(this, newObject)
		}
		await writeJson(this.local_path.ApproveUsers, this.approveUsers)
		await writeJson(this.local_path.logsUsers, this.logsUsers)
	}
	properties() {
		return {
			approveUsers: this.approveUsers,
			logsUsers: this.logsUsers,
		}
	}

	async remove() {
		await deleteJson(this.local_path.ApproveUsers)
		await deleteJson(this.local_path.logsUsers)
		await killDir(path.basename(this.local_path.ApproveUsers))
	}
}
