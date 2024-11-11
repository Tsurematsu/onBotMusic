import type { Page } from 'puppeteer'
import input from './Input'

class VoiceAndVideo {
	private page: Page
	input: input
	constructor(page) {
		this.page = page
		this.input = new input(page)
	}
}
export default VoiceAndVideo
