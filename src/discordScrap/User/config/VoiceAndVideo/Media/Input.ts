import type { Page } from 'puppeteer'

export default class Input {
	private page: Page
	constructor(page: Page) {
		this.page = page
	}
	async getDevices() {}
	async setDevice(device: string) {}
}
