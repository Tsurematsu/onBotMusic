import type { Page } from 'puppeteer'
import muted from './muted'
import unMute from './unMute'
export default class Microphone {
	page: Page
	muted
	unMute
	constructor(page: Page) {
		this.page = page
		this.muted = () => muted(page)
		this.unMute = () => unMute(page)
	}
}
