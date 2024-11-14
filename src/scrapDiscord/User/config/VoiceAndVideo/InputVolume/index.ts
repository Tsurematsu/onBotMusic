import type { Page } from 'puppeteer'
import selectOption from '../../modules/selectOption'
import setScroll from './modules/setScroll'
export default class InputVolume {
	page: Page
	constructor(page: Page) {
		this.page = page
	}
	async set(value: number) {
		await selectOption(this.page, 'Voz y vídeo')
		await this.page.waitForSelector('div[data-app-not-dev-tools="true"]')
		const [_, selectorClass] = await setScroll(this.page)
		const elements = await this.page.$$(`div.${selectorClass}`)
		const slider = elements[0]
		if (slider) {
			const boundingBox = await slider.boundingBox()
			const segments = boundingBox.width / 100
			const porcentaje = segments * value
			const xPos = boundingBox.x + porcentaje
			const yPos = boundingBox.y + boundingBox.height / 2 + 1
			await this.page.mouse.click(xPos, yPos)
			return true
		}
		return false
	}
	// PENDING :Get, need to implement the get method
}
