import type { Page } from 'puppeteer'
import selectOption from '../../modules/selectOption'
import getProperty from './modules/getProperty'
export default class Sensibility {
	page: Page
	constructor(page: Page) {
		this.page = page
	}
	async set(value) {
		await selectOption(this.page, 'Voz y vídeo')
		await new Promise((resolve) => setTimeout(resolve, 5000))
		const sliderClass = await getProperty(this.page)
		const classA = `.${sliderClass.replace(' ', '.')}`
		const slider = await this.page.$(classA)
		if (slider) {
			// Obtener las coordenadas del slider (posición y tamaño)
			const boundingBox = await slider.boundingBox()
			// Definir la posición en el slider donde hacer clic (por ejemplo, en el centro)
			const xPos = boundingBox.x + value
			const yPos = boundingBox.y + boundingBox.height / 2
			// Simular un clic en esa posición
			await this.page.mouse.click(xPos, yPos)
			return true
		}
		return false
	}
}
