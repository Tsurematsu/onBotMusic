import type { Page } from 'puppeteer'
import Login from './Login'
import Config from './config'
class User {
	private page: Page
	login: Login['main']
	config: Config
	constructor(page) {
		this.page = page
		this.login = new Login(page).main
		this.config = new Config(page)
	}
}
export default User
