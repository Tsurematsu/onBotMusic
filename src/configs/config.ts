import BrowserConfig from './BrowserConfig'
import ChannelConfig from './ChannelConfig'
import SystemConfig from './SystemConfig'
export default new (class config {
	browser = new BrowserConfig()
	system = new SystemConfig()
	channel = new ChannelConfig()
	async loadAll() {
		await this.browser.load()
		await this.system.load()
		await this.channel.load()
	}
	async saveAll() {
		await this.browser.save()
		await this.system.save()
		await this.channel.save()
	}
	patchAll() {
		return {
			browser: this.browser.local_path,
			system: this.system.local_path,
			channel: this.channel.local_path,
		}
	}
	clearAll() {
		this.browser.remove()
		this.system.remove()
		this.channel.remove()
	}
})()
