import type { Page } from 'puppeteer'

export default async function closeConfig(page: Page) {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const { document } = Object as any
	try {
		await page.waitForSelector('div[aria-label="Cerrar"]', {
			timeout: 2000,
		})
		await page.evaluate(() => {
			try {
				const element = document.querySelector('div[aria-label="Cerrar"]')
				element.click()
			} catch (error) {}
		})
	} catch (error) {
		console.log('config.input: error', error)
	}
}
