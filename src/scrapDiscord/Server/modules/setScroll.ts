import type { Page } from 'puppeteer'

export default async function setScroll(page: Page) {
	return await page.evaluate(() => {
		const scrollerElement = document.querySelectorAll(
			'div[class*="scroller_"]',
		)[1]
		if (scrollerElement) {
			scrollerElement.scrollTop = scrollerElement.scrollHeight
		}
	})
}
