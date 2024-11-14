import type { Page } from 'puppeteer'

export default async function getOptions(page: Page) {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const { document } = Object as any
	return await page.evaluate(() => {
		const tag = 'Supresión de ruido'
		function main() {
			const elements = document.querySelectorAll('h5')
			let elementProperty = null
			for (const element of Array.from(elements)) {
				// @ts-ignore
				const innerElement = element.innerHTML.toLowerCase().trim()
				const elementTag = tag.toLowerCase().trim()
				if (innerElement === elementTag) {
					elementProperty = element
					break
				}
			}
			if (elementProperty) {
				// @ts-ignore
				const parentNodeHTMl = elementProperty.parentNode
				const selector0 = 'div[role="radiogroup"]'
				const listElement = parentNodeHTMl
					.querySelector(selector0)
					.querySelectorAll('div[role="radio"]')
				const suprimeBots = []
				for (const element of Array.from(listElement)) {
					// @ts-ignore
					const onClases = `.${element.className.replace(' ', '.')}`
					// @ts-ignore
					suprimeBots.push(element.innerText)
				}
				return suprimeBots
			}
		}
		return main()
	})
}
