import type { Page } from 'puppeteer'

class Media {
	page: Page
	constructor(page: Page) {
		this.page = page
	}
	async input() {}
}
export default Media
