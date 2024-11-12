export default async function openInput(page) {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const { document } = Object as any
	const response = await page.evaluate(async () => {
		async function main() {
			try {
				const elementScroll = document.querySelector(
					'div[class*="contentRegionScroller_"]',
				)
				if (elementScroll) elementScroll.scrollTop = 0
			} catch {}
			try {
				await new Promise((resolve) => setTimeout(resolve, 200))
				const elementos = document.querySelector('h3')
				const elementoDiv = elementos.parentNode.querySelectorAll('div')[0]
				elementoDiv.click()
				const classList = []
				for (const className of elementoDiv.classList) {
					classList.push(className)
				}
				return classList.join(' ')
			} catch (error) {
				console.log('error', error)
				return false
			}
		}
		return await main()
	})
	return response
}
// theme-dark images-dark layer_cd0de5
