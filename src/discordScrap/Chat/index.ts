import type { Page } from 'puppeteer'
import Microphone from './Microphone'
import open from './open'
export default class Chat {
	private page: Page
	open
	microphone: Microphone
	constructor(page: Page) {
		this.page = page
		this.open = (callback) => open(this.page, callback)
		this.microphone = new Microphone(this.page)
	}
}
