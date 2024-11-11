import type { Page } from 'puppeteer'
import VoiceAndVideo from './VoiceAndVideo'
import input from './input'
import closeConfig from './modules/closeConfig'
import openConfig from './modules/openConfig'
class Config {
	private page: Page
	input: input['main']
	voiceAndVideo: VoiceAndVideo
	constructor(page) {
		this.page = page
		this.input = new input(page).main
		this.voiceAndVideo = new VoiceAndVideo(page)
	}
	open = () => openConfig(this.page)
	close = () => closeConfig(this.page)
}
export default Config
