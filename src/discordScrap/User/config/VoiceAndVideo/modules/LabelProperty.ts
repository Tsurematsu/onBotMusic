import type { Page } from 'puppeteer'

export default async function LabelProperty(page: Page, property: string) {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const { document } = Object as any
	return await page.evaluate((property) => {
		function main(property) {
			try {
				const divElements = document.querySelectorAll('label')
				let elementOption = null
				for (const element of Array.from(divElements)) {
					if (
						// @ts-ignore
						element.innerText
							.toLowerCase()
							.includes(property.toLowerCase())
					) {
						// @ts-ignore
						elementOption = element
					}
				}
				elementOption.click()
				return elementOption.className
			} catch (error) {
				return ''
			}
		}
		return main(property)
	}, property)
}
