import BrowserConfig from './BrowserConfig'
import SystemConfig from './SystemConfig'
import UserConfig from './UserConfig'
export default new (class config {
	browser = new BrowserConfig()
	system = new SystemConfig()
	user = new UserConfig()
	async loadAll() {
		await this.browser.load()
		await this.system.load()
		await this.user.load()
	}
	async saveAll() {
		await this.browser.save()
		await this.system.save()
		await this.user.save()
	}
	patchAll() {
		return {
			browser: this.browser.local_path,
			system: this.system.local_path,
			user: this.user.local_path,
		}
	}
	clearAll() {
		this.browser.remove()
		this.system.remove()
		this.user.remove()
	}
})()
