import type { Page } from 'puppeteer'
export default async function disconnect(page: Page) {
	const button = await page.waitForSelector('button[aria-label="Desconectar"]')
	await button.click()
}
