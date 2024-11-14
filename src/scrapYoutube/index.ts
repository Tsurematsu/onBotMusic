import type { Browser, Page } from 'puppeteer'
import Actions from './Actions'

export default class scrapYoutube {
	onAdsDetected = console.log
	private page: Page
	private async detectedAds() {
		// Method 1
		await new Promise((resolve) => setTimeout(resolve, 100))
		return await this.page.evaluate(() => {
			const selector = 'div[class="video-ads ytp-ad-module"]'
			return document.querySelector(selector) !== null
		})

		// Method 2
		// try {
		// 	const selector = 'div[class="video-ads ytp-ad-module"]'
		// 	await this.page.waitForSelector(selector, { timeout: 100 })
		// 	console.log('Ads detected, reloading page...')
		// 	return true
		// } catch {
		// 	console.log('No ads detected')
		// 	return false
		// }
	}
	private async loopAds(resolve = () => {}) {
		if (await this.detectedAds()) {
			await this.onAdsDetected('Ads detected, reloading page...')
			await this.page.reload()
			await this.page.waitForSelector('video')
			await this.loopAds(resolve)
		} else resolve()
	}
	actions: Actions
	async make(browser: Browser) {
		this.page = await browser.newPage()
		this.actions = new Actions(this.page)
		return this
	}
	async goto(url: string) {
		await this.page.bringToFront()
		await this.page.goto(url)
		await this.page.waitForSelector('video')
		await new Promise<void>((resolve) => this.loopAds(resolve))
	}
}
