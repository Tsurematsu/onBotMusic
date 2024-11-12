import type { Page } from 'puppeteer'

export default class noiseSuppression {
	page: Page
	constructor(page: Page) {
		this.page = page
	}
}
