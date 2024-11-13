export default async function open(page, callback) {
	page
	// aria-label="Mostrar chat"
	const button = await page.$('button[aria-label*="Mostrar chat"]')
	if (button) await button.click()

	console.log('---> open')
}
