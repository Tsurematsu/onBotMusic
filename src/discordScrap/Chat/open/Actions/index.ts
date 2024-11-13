import type { Page } from 'puppeteer'
import listen from './listen'
import messages from './messages'
import send from './send'
export default class Actions {
	send: (message: string) => void
	listen: (callback: (message: string) => void) => void
	messages: () => void
	constructor(page: Page) {
		this.send = (message) => send(page, message)
		this.listen = (callback) => listen(page, callback)
		this.messages = () => messages(page)
	}
}
