import type { Page } from 'puppeteer'
import valueLogIn from './valueLogIn'
class Login {
	private page: Page

	constructor(page) {
		this.page = page
	}
	async main(credencial) {
		await this.page.bringToFront()
		await this.page.goto('https://discord.com/login', {
			waitUntil: 'networkidle2',
		})
		await this.page.bringToFront()
		await new Promise((resolve) => setTimeout(resolve, 2000))
		const loginIN = async (element, credencial) => {
			try {
				await this.page.waitForSelector(element.email)
				await this.page.click(element.email)
				await this.page.type(element.email, credencial.email)

				await this.page.waitForSelector(element.password)
				await this.page.click(element.password)
				await this.page.type(element.password, credencial.password)

				await this.page.waitForSelector(element.button)
				await this.page.click(element.button)
			} catch (error) {}
		}
		const onTau = async () => {
			try {
				const element = await this.page.$('div[class*="userActions_"] button')
				await element.click()
				return true
			} catch (error) {
				return false
			}
		}

		const element = {
			email: 'input[name="email"]',
			password: 'input[name="password"]',
			button: 'button[type="submit"]',
		}

		const flagLogin = async () => {
			const responseMSG = await onTau()
			if (responseMSG) {
				await loginIN(element, credencial)
				return true
			}

			const responseLogIn = await valueLogIn(this.page, 2000)
			if (!responseLogIn) {
				await loginIN(element, credencial)
				return false
			}

			return true
		}
		const response = await flagLogin()
		const selector = 'nav[aria-label="Barra lateral de servidores"]'
		await this.page.waitForSelector(selector)
		return response
	}
}
export default Login
