import type { Page } from 'puppeteer'
class input {
	page: Page
	constructor(page) {
		this.page = page
	}

	async main(option) {
		// aria-label="Chat"
		await this.page.waitForSelector('div[aria-label="Voz y vídeo"]')

		console.log('config.input:', option)
	}
}
export default input
