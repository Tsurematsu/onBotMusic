import type { Browser, Page } from 'puppeteer'
import Actions from './Actions'

export default class scrapYoutube {
	private page: Page
	actions: Actions
	async make(browser: Browser) {
		this.page = await browser.newPage()
		this.actions = new Actions(this.page)
		return this
	}
	async goto(url: string) {
		await this.page.goto(url, {
			waitUntil: 'networkidle2',
		})
		await this.page.bringToFront()
	}
}
