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
			await page.waitForSelector('button[aria-label*="Mostrar chat"]')
			const button = await page.$('button[aria-label*="Mostrar chat"]')
			if (button) await button.click()
			await new Promise((resolve) => setTimeout(resolve, 1000))
			await getMessages(page)
			const onListenChat: ListenChat = await new ListenChat(page).start()
			callback(new Actions(page, onListenChat, resolveLocal))
		}
		attach()
	})
}
