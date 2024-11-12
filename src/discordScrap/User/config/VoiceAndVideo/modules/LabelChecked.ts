import type { Page } from 'puppeteer'

export default async function LabelChecked(
	page: Page,
	property: string,
	variant = 0,
) {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const { document } = Object as any
	return await page.evaluate(
		(property, variant) => {
			function main(property, variant) {
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
					const selectVariants = [
						() => {
							const checkedElement = elementOption.parentElement
								.querySelector('div')
								.querySelector('div')
							return checkedElement
								? checkedElement.className.includes('checked')
								: null
						},
						() => {
							const checkedElement = elementOption.parentElement
								.querySelector('div')[1]
								.querySelector('div')
							return checkedElement
								? checkedElement.className.includes('checked')
								: null
						},
					]
					return selectVariants[variant] ? selectVariants[variant]() : null
				} catch (error) {
					return null
				}
			}
			return main(property, variant)
		},
		property,
		variant,
	)
}
