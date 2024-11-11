// DEPRECATED : This file is not used anymore, it was used to test the input of the voice channel, traslade to the VoiceAndVideo.ts
import type { Page } from 'puppeteer'
class input {
	page: Page
	constructor(page) {
		this.page = page
	}

	async main(option) {
		// aria-label="Chat"
		await this.page.waitForSelector('div[aria-label="Voz y vídeo"]')
		await this.page.click('div[aria-label="Voz y vídeo"]')
		console.log('config.input:', option)
	}
}
export default input
