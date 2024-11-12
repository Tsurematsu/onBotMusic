import type { Page } from 'puppeteer'
import open from './open'
export default class Chat {
	private page: Page
	open
	constructor(page: Page) {
		this.page = page
		this.open = (callback) => open(this.page, callback)
	}
}
