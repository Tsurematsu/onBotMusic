import type { Page } from 'puppeteer'

export default async function setScroll(page: Page) {
	return page.evaluate(() => {
		const tagElement = 'Volumen de salida'
		function main() {
			console.log('main')
			const elementScroll = document.querySelector(
				'div[class*="contentRegionScroller_"]',
			)
			if (elementScroll) elementScroll.scrollTop = 200
			let selectElement = document.querySelectorAll('h3')
			for (const element of Array.from(selectElement)) {
				const text = element.innerText.toLowerCase().trim()
				const text2 = tagElement.toLowerCase().trim()
				if (text === text2) {
					// @ts-ignore
					selectElement = element.parentNode.querySelectorAll('div')[0]
					break
				}
			}
			return [
				// @ts-ignore
				selectElement.getAttribute('aria-labelledby'),
				// @ts-ignore
				`${selectElement.className.replace(' ', '.')}`,
			]
		}
		main()
		return main()
	})
}
