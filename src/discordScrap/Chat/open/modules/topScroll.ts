// DEPRECATED: because bug in select channel
import type { Page } from 'puppeteer'
export default async function topScroll(page: Page) {
	try {
		await page.waitForSelector('div[class*="messagesWrapper_"]')
	} catch (error) {
		console.log('topScroll error [topScroll.ts]')
		await new Promise((resolve) => setTimeout(resolve, 1000))
	}
	return await page.evaluate(() => {
		try {
			const patent = document.querySelector('div[class*="messagesWrapper_"]')
			const scroller = patent.querySelector('div[class*="scroller_"]')
			scroller.scrollTop = scroller.scrollHeight
		} catch {}
	})
}
