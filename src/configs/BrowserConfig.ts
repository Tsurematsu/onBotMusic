import path from 'node:path'
import { kDir, killDir, path_config, path_runtime } from '../utils/cPath'
import { deleteJson, readJson, verifyJsonFile, writeJson } from '../utils/json'
export default class BrowserConfig {
	local_path = {
		config: path.join(path_config, '/onBot/Config.json'),
		runtime: path.join(path_runtime, '/onBot/Runtime'),
		extensions: path.join(path_runtime, '/onBot/Extensions'),
	}
	headless = false
	devtools = false
	defaultViewport = null
	userDataDir = this.local_path.runtime
	browserArgs = [
		'--no-sandbox',
		`--disable-extensions-except=${this.local_path.extensions}`,
		`--load-extension=${this.local_path.extensions}`,
		'--disable-setuid-sandbox',
	]
	async load() {
		await kDir(this.local_path.runtime)
		const checkPath = await verifyJsonFile(this.local_path.config)
		const clone = this.properties()
		if (checkPath.status === false) {
			await writeJson(this.local_path.config, clone)
		}
		const readConfig = await readJson(this.local_path.config)
		Object.assign(this, readConfig)
	}
	async save(newObject = null) {
		if (newObject !== null) {
			Object.assign(this, newObject)
		}
		await writeJson(this.local_path.config, this.properties())
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
		await killDir(this.local_path.runtime)
		await killDir(this.local_path.extensions)
		await deleteJson(this.local_path.config)
	}
}
