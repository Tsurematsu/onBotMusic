import type { Page } from 'puppeteer'
export default class echoCancellation {
	page: Page
	constructor(page: Page) {
		this.page = page
	}
}
