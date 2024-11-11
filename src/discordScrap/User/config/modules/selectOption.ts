export default async function selectOption(option: string) {
	try {
		await this.page.waitForSelector(`div[aria-label="${option}"]`)
		await this.page.click(`div[aria-label="${option}"]`)
		return true
	} catch (error) {
		return false
	}
}
