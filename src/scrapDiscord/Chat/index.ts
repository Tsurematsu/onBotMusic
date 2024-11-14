import type { Page } from 'puppeteer'
import Microphone from './Microphone'
import open from './open'
import type Actions from './open/Actions'
export default class Chat {
	private page: Page
	open: (callback: (actions: Actions) => void) => void
	microphone: Microphone
	constructor(page: Page) {
		this.page = page
		this.open = (callback) => open(this.page, callback)
		this.microphone = new Microphone(this.page)
	}
}
