import type { Page } from 'puppeteer'
export default async function messages(page: Page) {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const { window } = Object as any
	return await page.evaluate(() => {
		try {
			return window.getMessages()
		} catch {
			return []
		}
	})
}
