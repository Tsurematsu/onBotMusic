import type { Page } from 'puppeteer'

export default class NoiseSuppression {
	page: Page
	constructor(page: Page) {
		this.page = page
	}
}
