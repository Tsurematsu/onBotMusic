import type { Page } from 'puppeteer'
import Channel from './Channel'
import Server from './Server'
import User from './User'
const discord = {
	server: (page: Page) => new Server(page),
	channel: (page: Page) => new Channel(page),
	user: (page: Page) => new User(page),
}
export default discord
