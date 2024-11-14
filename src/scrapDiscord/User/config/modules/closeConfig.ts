import type { Page } from 'puppeteer'

export default async function closeConfig(page: Page) {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const { document } = Object as any
	try {
		await page.waitForSelector('div[aria-label="Cerrar"]', {
			timeout: 2000,
		})
		const retorno = await page.evaluate(() => {
			try {
				const element = document.querySelector('div[aria-label="Cerrar"]')
				element.click()
				return true
			} catch (error) {
				return false
			}
		})
		await new Promise((resolve) => setTimeout(resolve, 1000))
		return retorno
	} catch (error) {
		console.log('config.input: error', error)
		return false
	}
}
