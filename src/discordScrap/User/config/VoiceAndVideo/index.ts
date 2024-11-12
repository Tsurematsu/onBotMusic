import type { Page } from 'puppeteer'
import selectOption from '../modules/selectOption'
import input from './Input'
import Sensibility from './sensibility'
class VoiceAndVideo {
	private page: Page
	input: input
	sensibility: Sensibility
	into = async () => {
		await selectOption(this.page, 'Voz y vídeo')
	}
	constructor(page) {
		this.page = page
		this.input = new input(page)
		this.sensibility = new Sensibility(page)
	}
}
export default VoiceAndVideo
