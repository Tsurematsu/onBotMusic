import dotenv from 'dotenv'
dotenv.config()
export default class Client {
	async login(page) {
		const element = {
			email: 'input[name="email"]',
			password: 'input[name="password"]',
			button: 'button[type="submit"]',
		}
		await page.goto('https://discord.com/login')
		await page.bringToFront()
		await page.waitForSelector(element.email)
		await page.click(element.email)
		await page.type(element.email, process.env.email)

		await page.waitForSelector(element.password)
		await page.click(element.password)
		await page.type(element.password, process.env.password)

		await page.waitForSelector(element.button)
		await page.click(element.button)
	}
}
