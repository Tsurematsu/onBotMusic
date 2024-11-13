import type { Page } from 'puppeteer'
export default async function disconnect(page: Page) {
	await new Promise((resolve) => setTimeout(resolve, 1000))
	const button = await page.waitForSelector('button[aria-label="Desconectar"]')
	await button.click()
}
