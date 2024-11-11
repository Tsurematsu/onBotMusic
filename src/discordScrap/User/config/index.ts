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
	open = () => openConfig(this.page)
	close = () => closeConfig(this.page)
}
export default Config
