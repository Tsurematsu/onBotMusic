import type { Page } from 'puppeteer'
import input from './input'
import closeConfig from './modules/closeConfig'
import openConfig from './modules/openConfig'
const errorMSG =
	'Config not open, please use open() method. [await Config.open()]'
class Config {
	page: Page
	input: input['main']
	constructor(page) {
		this.page = page
		this.input = new input(page).main
	}
	open = () => openConfig(this.page)
	close = () => closeConfig(this.page)
}
export default Config
