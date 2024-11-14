import type { Page } from 'puppeteer'

export default async function getProperty(page: Page) {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const { document } = Object as any
	return await page.evaluate(() => {
		const property = 'Previsualizar siempre el vídeo'
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
				return elementOption.className
			} catch (error) {
				return ''
			}
		}
		return main(property)
	})
}
