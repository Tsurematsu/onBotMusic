import type { Browser, Page } from 'puppeteer'
import Channel from './Channel'
import Server from './Server'
import User from './User'
class DiscordScrap {
	page: Page
	server: Server
	channel: Channel
	user: User
	url
	async make(browser: Browser) {
		const context = browser.defaultBrowserContext()
		await context.overridePermissions('https://discord.com', ['microphone'])
		this.page = await browser.newPage()
		this.server = new Server(this.page)
		this.channel = new Channel(this.page)
		this.user = new User(this.page)
		return this
	}
}
export default DiscordScrap
