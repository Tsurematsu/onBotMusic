export default class Login {
	async main(page, credencial) {
		const element = {
			email: 'input[name="email"]',
			password: 'input[name="password"]',
			button: 'button[type="submit"]',
		}
		await page.goto('https://discord.com/login')
		await page.bringToFront()

		try {
			await page.waitForSelector(element.email)
			await page.click(element.email)
			await page.type(element.email, credencial.email)

			await page.waitForSelector(element.password)
			await page.click(element.password)
			await page.type(element.password, credencial.password)

			await page.waitForSelector(element.button)
			await page.click(element.button)
		} catch (error) {}
		console.log('login')
	}
}
