import path from 'node:path'
import type { Browser, Page } from 'puppeteer'
import Channel from './Channel'
import Chat from './Chat'
import Server from './Server'
import User from './User'
class DiscordScrap {
	private scriptPaths = {
		path: path.resolve(__dirname, './topModules/getMessages.js'),
	}
	page: Page
	server: Server
	channel: Channel
	user: User
	chat: Chat
	url
	async make(browser: Browser) {
		const context = browser.defaultBrowserContext()
		await context.overridePermissions('https://discord.com', ['microphone'])
		this.page = await browser.newPage()
		await this.page.addScriptTag(this.scriptPaths)
		this.server = new Server(this.page)
		this.channel = new Channel(this.page)
		this.user = new User(this.page)
		this.chat = new Chat(this.page)
		return this
	}
}
export default DiscordScrap
