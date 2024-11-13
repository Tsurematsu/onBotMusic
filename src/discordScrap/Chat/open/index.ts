import type { Page } from 'puppeteer'
import getMessages from '../../topModules/getMessages'
import Actions from './Actions'
export default async function open(
	page: Page,
	callback: (actions: Actions) => void,
) {
	await page.waitForSelector('button[aria-label*="Mostrar chat"]')
	const button = await page.$('button[aria-label*="Mostrar chat"]')
	if (button) await button.click()
	await getMessages(page)
	callback(new Actions(page))
}
