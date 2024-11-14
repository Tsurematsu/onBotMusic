import type { Browser, Page } from 'puppeteer'
import Actions from './Actions'

export default class scrapYoutube {
	onAdsDetected = 0
	private page: Page
	private browser: Browser
	private async detectedAds() {
		// Method 1
		await new Promise((resolve) => setTimeout(resolve, 100))
		return await this.page.evaluate(() => {
			const selector = 'div[class="video-ads ytp-ad-module"]'
			return document.querySelector(selector) !== null
		})
	}
	private async loopAds(resolve = () => {}) {
		if (await this.detectedAds()) {
			this.onAdsDetected++
			await this.page.reload()
			await this.page.waitForSelector('video')
			await this.loopAds(resolve)
		} else resolve()
	}
	actions: Actions
	async make(browser: Browser) {
		this.browser = browser
		this.page = await browser.newPage()
		this.actions = new Actions(this.page)
		return this
	}
	async goto(url: string, pageReturn: Page = null) {
		this.onAdsDetected = 0
		await this.page.bringToFront()
		await this.page.goto(url)
		await this.page.waitForSelector('video')
		await new Promise<void>((resolve) => this.loopAds(resolve))
		if (pageReturn) pageReturn.bringToFront()
		return this.onAdsDetected
	}
}

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
