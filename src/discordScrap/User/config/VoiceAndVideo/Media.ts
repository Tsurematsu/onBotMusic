import type { Page } from 'puppeteer'
import selectOption from '../modules/selectOption'
class Media {
	private page: Page
	constructor(page: Page) {
		this.page = page
	}
	async input(select) {
		await selectOption(this.page, 'Voz y vídeo')
	}
}
export default Media
