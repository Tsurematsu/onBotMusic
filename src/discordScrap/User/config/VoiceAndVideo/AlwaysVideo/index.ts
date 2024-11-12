import type { Page } from 'puppeteer'
import selectOption from '../../modules/selectOption'
import getProperty from './modules/getProperty'
export default class AlwaysVideo {
	page: Page
	constructor(page: Page) {
		this.page = page
	}

	async enable() {
		await selectOption(this.page, 'Voz y vídeo')
		await getProperty(this.page)
	}
}
