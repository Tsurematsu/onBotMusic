export default async function getSliceValue(page) {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const { document } = Object as any
	return await page.evaluate(() => {
		const property = 'Sensibilidad de entrada'
		function main(property) {
			const divElements = document.querySelectorAll('h3')
			let elementOption = null
			for (const element of Array.from(divElements)) {
				// @ts-ignore
				if (element.innerText.toLowerCase().includes(property.toLowerCase())) {
					// @ts-ignore
					elementOption = element.parentNode
						.querySelector('div')
						.querySelector('section')
						.querySelector('div')
				}
			}
			return elementOption.getAttribute('aria-valuenow')
		}
		return main(property)
	})
}
