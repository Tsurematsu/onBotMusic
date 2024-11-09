import path from 'node:path'
import { killDir, path_app, path_config } from '../utils/cPath'
import { deleteJson, readJson, verifyJsonFile, writeJson } from '../utils/json'
export default class UserConfig {
	nameConfig = ''
	channelURL = ''
	channelName = ''
	botName = ''
	botTag = ''
	scrollSelector = ''
	commands = {
		play: '/modules/play.js',
		stop: '/modules/stop.js',
		start: '/modules/start.js',
	}
	local_path = {
		configUser: path.join(path_config, '/onBot/ConfigUsers.json'),
		modules: path.join(path_app, '/modules'),
	}

	async load() {
		const checkPathConfigUser = await verifyJsonFile(this.local_path.configUser)
		if (checkPathConfigUser.status === false) {
			await writeJson(this.local_path.configUser, this.properties())
		}
		const readConfigUser = await readJson(this.local_path.configUser)
		Object.assign(this, readConfigUser)
	}
	async save(newObject = null) {
		if (newObject !== null) {
			Object.assign(this, newObject)
		}
		await writeJson(this.local_path.configUser, this.properties())
	}
	properties() {
		const clone = Object.assign({}, this)
		for (const key in clone) {
			if (typeof clone[key] === 'function' || key.includes('_')) {
				delete clone[key]
			}
		}
		return clone
	}
	async remove() {
		await deleteJson(this.local_path.configUser)
		await killDir(path.basename(this.local_path.configUser))
	}
}
