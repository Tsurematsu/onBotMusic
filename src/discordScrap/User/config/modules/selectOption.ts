export default async function selectOption(page, option: string) {
	try {
		await page.waitForSelector(`div[aria-label="${option}"]`)
		await page.click(`div[aria-label="${option}"]`)
		return true
	} catch (error) {
		return false
	}
}
