import type { Page } from 'puppeteer'

export default async function muted(page: Page, value: boolean) {
	await page.waitForSelector('video')
	await page.evaluate((value) => {
		const video = document.querySelector('video')
		if (video) video.muted = value
	}, value)
}
