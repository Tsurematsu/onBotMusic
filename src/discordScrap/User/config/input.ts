import type { Page } from 'puppeteer'
import closeConfig from './modules/closeConfig'
import openConfig from './modules/openConfig'
class input {
	page: Page
	constructor(page) {
		this.page = page
	}

	async main(option) {
		// aria-label="Ajustes de usuario"
		console.log('config.input:', option)
		openConfig(this.page)
		await new Promise((resolve) => setTimeout(resolve, 1000))
		closeConfig(this.page)
		// aria-label="Cerrar"
	}
}
export default input
