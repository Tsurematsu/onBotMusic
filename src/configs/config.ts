import BrowserConfig from './BrowserConfig'
import ChannelConfig from './ChannelConfig'
import SystemConfig from './SystemConfig'
const browser = new BrowserConfig()
const system = new SystemConfig()
const channel = new ChannelConfig()
const config = {
	browser,
	system,
	channel,
	all: {
		load: async () => {
			await browser.load()
			await system.load()
			await channel.load()
		},
		save: () => {
			browser.save()
			system.save()
			channel.save()
		},
		patch: () => {
			return {
				browser: browser.local_path,
				system: system.local_path,
				channel: channel.path,
			}
		},
		clear: () => {
			browser.remove()
			system.remove()
			channel.remove()
		},
		channel,
	},
}
export default config
