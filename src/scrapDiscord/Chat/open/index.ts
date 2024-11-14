import type { Page } from 'puppeteer'
import getMessages from '../../modulesTop/getMessages'
import ListenChat from '../../modulesTop/listenChat'
import Actions from './Actions'
export default async function open(
	page: Page,
	callback: (actions: Actions) => void,
) {
	return await new Promise((resolveLocal) => {
		const attach = async () => {
			try {
				await page.waitForSelector('button[aria-label*="Mostrar chat"]', {
					timeout: 100,
				})
				const button = await page.$('button[aria-label*="Mostrar chat"]')
				if (button) await button.click()
			} catch (error) {
				console.log('Error in open')
				await page.click('body')
				await page.keyboard.down('Control')
				await page.keyboard.press('KeyU')
				await page.keyboard.up('Control')
			}
			await new Promise((resolve) => setTimeout(resolve, 1000))
			try {
				await getMessages(page)
			} catch (error) {
				console.log('Error in getMessages', error)
			}
			const onListenChat: ListenChat = await new ListenChat(page).start()
			callback(new Actions(page, onListenChat, resolveLocal))
		}
		attach()
	})
}
