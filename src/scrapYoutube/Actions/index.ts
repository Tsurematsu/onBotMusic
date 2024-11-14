import type { Page } from 'puppeteer'
import muted from './muted'
import pause from './pause'
import play from './play'
import setVolume from './setVolume'

export default class Actions {
	protected page: Page
	play: () => void
	pause: () => void
	setVolume: (value: number) => void
	muted: (boolean) => void
	constructor(page: Page) {
		this.page = page
		this.play = () => play(this.page)
		this.pause = () => pause(this.page)
		this.setVolume = (value: number) => setVolume(this.page, value)
		this.muted = (value: boolean) => muted(this.page, value)
	}
}
