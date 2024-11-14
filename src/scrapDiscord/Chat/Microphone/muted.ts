// document.querySelector('button[aria-label="Silenciar"').click()
export default async function muted(page) {
	await page.waitForSelector('button[aria-label="Silenciar"]')
	const element = await page.$('button[aria-label="Silenciar"]')
	const checked = await element.evaluate((el) =>
		el.getAttribute('aria-checked'),
	)
	console.log('checked', checked)
	if (checked === 'true') return
	await page.click('button[aria-label="Silenciar"]')
}
