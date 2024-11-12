import type { Page } from 'puppeteer'
import VoiceAndVideo from './VoiceAndVideo'
import closeConfig from './modules/closeConfig'
import openConfig from './modules/openConfig'
class Config {
	private page: Page
	voiceAndVideo: VoiceAndVideo
	constructor(page) {
		this.page = page
		this.voiceAndVideo = new VoiceAndVideo(page)
	}
	async open(callback = null) {
		if (callback !== null) {
			await openConfig(this.page)
			await callback()
			await closeConfig(this.page)
			await new Promise((resolve) => setTimeout(resolve, 500))
			return
		}
		return await openConfig(this.page)
	}
	async close() {
		return await closeConfig(this.page)
	}
}
export default Config
