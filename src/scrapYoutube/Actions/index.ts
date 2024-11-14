import type { Page } from 'puppeteer'
import pause from './pause'
import play from './play'

export default class Actions {
	protected page: Page
	play: () => void
	pause: () => void
	constructor(page: Page) {
		this.page = page
		this.play = () => play(this.page)
		this.pause = () => pause(this.page)
	}
}
