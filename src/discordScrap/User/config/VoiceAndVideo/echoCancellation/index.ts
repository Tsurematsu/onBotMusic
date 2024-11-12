import type { Page } from 'puppeteer'
import selectOption from '../../modules/selectOption'
import LabelChecked from '../modules/LabelChecked'
import LabelProperty from '../modules/LabelProperty'
export default class echoCancellation {
	private tag = 'Cancelación de eco'
	page: Page
	constructor(page: Page) {
		this.page = page
	}
	async enable() {
		await selectOption(this.page, 'Voz y vídeo')
		const status = await LabelChecked(this.page, this.tag, 0)
		if (status === false) await LabelProperty(this.page, this.tag)
	}
	async disable() {
		await selectOption(this.page, 'Voz y vídeo')
		const status = await LabelChecked(this.page, this.tag, 0)
		if (status === true) await LabelProperty(this.page, this.tag)
	}
}
