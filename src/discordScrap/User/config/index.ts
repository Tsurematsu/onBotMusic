import type { Page } from 'puppeteer'
import input from './input'
import closeConfig from './modules/closeConfig'
import openConfig from './modules/openConfig'
const errorMSG =
	'Config not open, please use open() method. [await Config.open()]'
class Config {
	private flagOpen = false
	private onOpen(callback) {
		if (!this.flagOpen) throw new Error(errorMSG)
		return callback
	}
	page: Page
	input: input['main']
	constructor(page) {
		this.page = page
		this.input = this.onOpen(new input(this.page).main)
	}
	async open() {
		await openConfig(this.page)
		this.flagOpen = true
	}
	async close() {
		await closeConfig(this.page)
		this.flagOpen = false
	}
}
export default Config
