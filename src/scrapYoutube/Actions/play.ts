import type { Page } from 'puppeteer'

export default async function play(page: Page) {
	await page.waitForSelector('video')
	await page.evaluate(() => {
		const video = document.querySelector('video')
		if (video) video.play()
	})
}
