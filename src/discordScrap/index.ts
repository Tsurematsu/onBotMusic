import type { Browser, Page } from 'puppeteer'
import Channel from './Channel'
import Chat from './Chat'
import Server from './Server'
import User from './User'
class DiscordScrap {
	private scriptPaths = {}
	page: Page
	server: Server
	channel: Channel
	user: User
	chat: Chat
	close: () => void
	url
	async make(browser: Browser) {
		const context = browser.defaultBrowserContext()
		await context.overridePermissions('https://discord.com', ['microphone'])
		this.page = await browser.newPage()
		this.server = new Server(this.page)
		this.channel = new Channel(this.page)
		this.user = new User(this.page)
		this.chat = new Chat(this.page)
		this.close = async () => {
			await new Promise((resolve) => setTimeout(resolve, 1000))
			// Guarda las cookies antes de cerrar la página
			const cookies = await this.page.cookies()
			await this.page.setCookie(...cookies)
			// Espera a que todos los eventos de cerrado se ejecuten
			await this.page.evaluate(() => {
				window.dispatchEvent(new Event('beforeunload'))
			})
			await this.page.close()
			await new Promise((resolve) => setTimeout(resolve, 1000))
		}
		return this
	}
}
export default DiscordScrap
