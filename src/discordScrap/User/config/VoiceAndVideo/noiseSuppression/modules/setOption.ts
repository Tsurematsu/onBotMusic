import type { Page } from 'puppeteer'

export default async function setOption(page: Page, selector: string) {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const { document } = Object as any
	return await page.evaluate((selector) => {
		const tag = 'Supresión de ruido'
		function main(selector) {
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
				for (const element of Array.from(listElement)) {
					// @ts-ignore
					const tagH = element.innerText.toLowerCase().trim()
					const tagE = selector.toLowerCase().trim().replaceAll('á', 'a')
					const cleanTag = tagH.replaceAll('á', 'a')
					if (cleanTag === tagE) {
						// @ts-ignore
						element.click()
						break
					}
				}
			}
		}
		return main(selector)
	}, selector)
}
