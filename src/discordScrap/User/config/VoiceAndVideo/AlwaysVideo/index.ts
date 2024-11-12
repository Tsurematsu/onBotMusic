import type { Page } from 'puppeteer'
import selectOption from '../../modules/selectOption'
import getChecked from './modules/getChecked'
import getProperty from './modules/getProperty'
export default class AlwaysVideo {
	page: Page
	constructor(page: Page) {
		this.page = page
	}
	async enable() {
		await selectOption(this.page, 'Voz y vídeo')
		const element = await getProperty(this.page)
		const status = await getChecked(this.page)
		if (status === false) await this.page.click(`label[class="${element}"]`)
	}
	async disable() {
		await selectOption(this.page, 'Voz y vídeo')
		const element = await getProperty(this.page)
		const status = await getChecked(this.page)
		if (status === true) await this.page.click(`label[class="${element}"]`)
	}
}
