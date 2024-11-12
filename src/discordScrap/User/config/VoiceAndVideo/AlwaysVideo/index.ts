import type { Page } from 'puppeteer'

export default class AlwaysVideo {
	page: Page
	constructor(page: Page) {
		this.page = page
	}

	async enable() {}
}
