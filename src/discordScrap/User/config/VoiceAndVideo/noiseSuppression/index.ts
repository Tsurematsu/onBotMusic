import type { Page } from 'puppeteer'
import selectOption from '../../modules/selectOption'
import setOption from './modules/setOption'
export default class NoiseSuppression {
	page: Page
	constructor(page: Page) {
		this.page = page
	}
	async nothing() {
		await selectOption(this.page, 'Voz y vídeo')
		await setOption(this.page, 'Ninguno')
	}
	async Krisp() {
		await selectOption(this.page, 'Voz y vídeo')
		await setOption(this.page, 'Krisp')
	}
	async Estandar() {
		await selectOption(this.page, 'Voz y vídeo')
		await setOption(this.page, 'Estandar')
	}
}
