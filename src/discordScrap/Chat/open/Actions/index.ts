import type ListenChat from '@/discordScrap/modulesTop/listenChat'
import type { dataMessage } from '@/discordScrap/modulesTop/listenChat'
import type { Page } from 'puppeteer'
import end from './end'
import listen from './listen'
import messages from './messages'
import send from './send'
export default class Actions {
	send: (message: string) => void
	listen: (callback: (message: dataMessage) => void) => void
	messages: () => void
	end: () => void
	constructor(page: Page, onListenChat: ListenChat, resolveLocal) {
		this.send = (message) => send(page, message)
		this.listen = (callback) => listen(onListenChat, callback)
		this.messages = () => messages(page)
		this.end = () => end(resolveLocal)
	}
}
