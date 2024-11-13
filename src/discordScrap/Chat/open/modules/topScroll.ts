import type { Page } from 'puppeteer'
export default async function topScroll(page: Page) {
	await page.waitForSelector('div[class*="messagesWrapper_"]')
	return await page.evaluate(() => {
		const patent = document.querySelector('div[class*="messagesWrapper_"]')
		const scroller = patent.querySelector('div[class*="scroller_"]')
		scroller.scrollTop = scroller.scrollHeight
	})
}
