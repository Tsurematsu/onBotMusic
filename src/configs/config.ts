import path from 'node:path'
import { kDir, path_config, path_runtime } from '../utils/cPath'
import { verifyJsonFile, writeJson } from '../utils/json'
export default new (class config {
	private dir_config = path.join(path_config, '/onBotConfig.json')
	private dir_runtime = path.join(path_runtime, '/onBotRuntime')
	private dir_extensions = path.join(path_runtime, '/onBotExtensions')
	browser = {}
	async getBrowserArgs() {
		await kDir(this.dir_runtime)
		const checkPath = await verifyJsonFile(this.dir_config)
		const loadExtension = (patch) => {
			return [
				`--disable-extensions-except=${patch}`,
				`--load-extension=${patch}`,
			]
		}
		this.browser = checkPath.data
		if (checkPath.status === false) {
			this.browser = {
				headless: false,
				devtools: false,
				defaultViewport: null,
				userDataDir: this.dir_runtime,
				browser_args: ['--no-sandbox', ...loadExtension(this.dir_extensions)],
			}
			writeJson(this.dir_config, this.browser)
		}
	}
})()
