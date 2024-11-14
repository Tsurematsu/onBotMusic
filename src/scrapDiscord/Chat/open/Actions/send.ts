import type { Page } from 'puppeteer'

export default async function send(page: Page, message) {
	await page.waitForSelector('form')
	const form = await page.$('form')
	const textbox = form ? await form.$('div[role="textbox"]') : null
	if (!textbox) return false
	await textbox.click()
	await textbox.type(message)
	await page.keyboard.press('Enter')
}
