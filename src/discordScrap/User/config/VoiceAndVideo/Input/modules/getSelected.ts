export default async function getSelected(page) {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const { document } = Object as any
	const response = await page.evaluate(async () => {
		async function main() {
			try {
				await new Promise((resolve) => setTimeout(resolve, 200))
				const elementos = document.querySelector('h3')
				const elementoDiv = elementos.parentNode.querySelectorAll('div')[0]
				return elementoDiv.innerText
			} catch (error) {
				console.log('error', error)
				return null
			}
		}
		return await main()
	})
	return response
}
