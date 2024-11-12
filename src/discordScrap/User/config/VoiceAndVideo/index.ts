import type { Page } from 'puppeteer'
import selectOption from '../modules/selectOption'
import input from './Input'
class VoiceAndVideo {
	private page: Page
	input: input
	into = async () => {
		await selectOption(this.page, 'Voz y vídeo')
	}
	constructor(page) {
		this.page = page
		this.input = new input(page)
	}
}
export default VoiceAndVideo
