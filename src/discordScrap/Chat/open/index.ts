import type { Page } from 'puppeteer'
import Actions from './Actions'
import topScroll from './modules/topScroll'

export default async function open(
	page: Page,
	callback: (actions: Actions) => void,
) {
	const actions = new Actions(page)
	const button = await page.$('button[aria-label*="Mostrar chat"]')
	await topScroll(page)
	if (button) await button.click()
	callback(actions)
}
