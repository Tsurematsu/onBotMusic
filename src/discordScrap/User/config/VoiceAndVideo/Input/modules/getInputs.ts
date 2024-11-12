export default async function getInputs(page) {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const { document } = Object as any
	const response = await page.evaluate(async () => {
		async function main() {
			try {
				await new Promise((resolve) => setTimeout(resolve, 200))
				const elements = document.querySelectorAll('div')
				// biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
				let popoutElement
				for (const element of Array.from(elements)) {
					// @ts-ignore
					if (element.id.includes('popout')) {
						popoutElement = element
					}
				}
				const inputsHTMl = popoutElement
					.querySelectorAll('div')[0]
					.querySelectorAll('div')
				const listDevices = Array.from(inputsHTMl)
					.map((input) => ({
						// @ts-ignore
						name: input.innerText,
						// @ts-ignore
						data_list_item_id: input.getAttribute('data-list-item-id'),
					}))
					.filter((input) => input.name !== '')
				return listDevices
			} catch (error) {
				console.log({ error })
				return []
			}
		}
		return await main()
	})

	return response
}

// theme-dark images-dark layer_cd0de5
