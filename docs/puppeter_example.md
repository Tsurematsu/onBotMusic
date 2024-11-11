````js
import puppeteer from 'puppeteer'
;(async () => {
	const browser = await puppeteer.launch({ headless: false })
	const page = await browser.newPage()

	const navigationPromise = page.waitForNavigation()

	await page.goto('https://discord.com/login')

	await navigationPromise

	await page.waitForSelector('input[name="email"]')
	await page.click('input[name="email"]')

	await navigationPromise

	//TODO : change to your email
	await page.type('input[name="email"]', 'youremail@gmail.com')

	await page.waitForSelector('#identifierNext')
	await page.click('#identifierNext')

	await page.waitFor(500)

	await page.waitForSelector('input[type="password"]')
	await page.click('input[name="email"]')
	await page.waitFor(500)

	//TODO : change to your password
	await page.type('input[type="password"]', 'yourpassword')

	await page.waitForSelector('#passwordNext')
	await page.click('#passwordNext')

	await navigationPromise

	//await browser.close()
})()
````
