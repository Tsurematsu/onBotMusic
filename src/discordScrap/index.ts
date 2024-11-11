import type { Page } from 'puppeteer'
import Channel from './Channel'
import Server from './Server'
import User from './User'
class DiscordScrap {
	page: Page
	server: Server
	channel: Channel
	user: User
	constructor(page: Page) {
		this.page = page
		this.server = new Server(page)
		this.channel = new Channel(page)
		this.user = new User(page)
	}
}
export default DiscordScrap
