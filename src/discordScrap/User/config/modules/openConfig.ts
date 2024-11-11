import type { Page } from 'puppeteer'
export default async function openConfig(page: Page) {
	try {
		await page.waitForSelector('button[aria-label="Ajustes de usuario"]', {
			timeout: 500,
		})
		await page.click('button[aria-label="Ajustes de usuario"]')
		return true
	} catch {
		return false
	}
}
