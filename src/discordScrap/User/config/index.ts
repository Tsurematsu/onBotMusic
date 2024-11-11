import type { Page } from 'puppeteer'
import input from './input'
class Config {
	page: Page
	input: input['main']
	constructor(page) {
		this.page = page
		this.input = new input(page).main
	}
}
export default Config
