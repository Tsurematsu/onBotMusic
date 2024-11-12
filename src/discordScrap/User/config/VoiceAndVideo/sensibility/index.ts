import type { Page } from 'puppeteer'
import selectOption from '../../modules/selectOption'
import getProperty from './modules/getProperty'
import scrollToElement from './modules/scrollToElement'
export default class Sensibility {
	page: Page
	constructor(page: Page) {
		this.page = page
	}
	async set(value) {
		await selectOption(this.page, 'Voz y vídeo')
		await this.page.waitForSelector('div[role="tabpanel"]')
		await scrollToElement(this.page)
		await new Promise((resolve) => setTimeout(resolve, 500))
		const sliderClass = await getProperty(this.page)
		const classA = `.${sliderClass.replace(' ', '.')}`
		// --------------------------------------------------------------
		const scrolling = async () => {
			if (await this.page.$(classA)) {
				const slider = await this.page.$(classA)
				// Obtener las coordenadas del slider (posición y tamaño)
				const boundingBox = await slider.boundingBox()
				// Definir la posición en el slider donde hacer clic (por ejemplo, en el centro)
				const segments = boundingBox.width / 100
				const porcentaje = segments * value
				const valueScale = porcentaje + (value <= 0 ? 1 : 0)
				const maxValueScale =
					valueScale >= boundingBox.width ? boundingBox.width - 1 : valueScale
				const xPos = boundingBox.x + maxValueScale
				const yPos = boundingBox.y + boundingBox.height / 2 + 1
				await this.page.mouse.click(xPos, yPos)
				return true
			}
			return false
		}
		return await scrolling()
		// console.log('No se ha podido cambiar la sensibilidad de voz')
		// return false
	}
}
