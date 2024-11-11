import valueLogIn from './valueLogIn'
class Login {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	page: any
	constructor(page) {
		this.page = page
	}
	async main(credencial) {
		const element = {
			email: 'input[name="email"]',
			password: 'input[name="password"]',
			button: 'button[type="submit"]',
		}
		await this.page.goto('https://discord.com/login')
		await this.page.bringToFront()
		if ((await valueLogIn(this.page, 2000)) === false) {
			try {
				await this.page.waitForSelector(element.email)
				await this.page.click(element.email)
				await this.page.type(element.email, credencial.email)

				await this.page.waitForSelector(element.password)
				await this.page.click(element.password)
				await this.page.type(element.password, credencial.password)

				await this.page.waitForSelector(element.button)
				await this.page.click(element.button)

				await this.page.waitForNavigation()
				// await this.page.keyboard.press('Escape')
				await this.page.keyboard.press('Enter')
			} catch (error) {}
		}
		await valueLogIn(this.page, 1000)
	}
}
export default Login
