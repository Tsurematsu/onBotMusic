export default async function listChannels(page, ariaLabel = 'Canales') {
	try {
		// @ts-ignore
		const { window } = Object
		await page.waitForSelector(`ul[aria-label="${ariaLabel}"]`)
		return await page.evaluate(async (ariaLabel) => {
			let channels = {}
			function onScroll() {
				let scrollElement = document.querySelectorAll('div')
				for (const element of Array.from(scrollElement)) {
					if (
						// biome-ignore lint/complexity/useOptionalChain: <explanation>
						element.classList &&
						element.classList[0] &&
						element.classList[0].includes('scroller_') &&
						element.id === 'channels'
					) {
						// @ts-ignore
						scrollElement = element
					}
				}
				return scrollElement
			}
			const elementScroll = onScroll()

			function getChannels() {
				const divServer = document.querySelectorAll(
					`ul[aria-label="${ariaLabel}"]`,
				)[0]
				const elements = divServer.querySelectorAll('li')
				const channels = {}
				for (const li of Array.from(elements)) {
					const attribute = li.getAttribute('data-dnd-name')
					if (attribute) {
						const aElement = li.querySelectorAll('a')[0]
						if (aElement) {
							channels[attribute] = aElement?.getAttribute('data-list-item-id')
						}
					}
				}
				return channels
			}

			async function main() {
				// @ts-ignore
				const limit = elementScroll.scrollHeight
				const summary = limit / 20
				for (let scrollI = 0; scrollI < limit; scrollI += summary) {
					// @ts-ignore
					elementScroll.scrollTop = scrollI
					await new Promise((resolve) => setTimeout(resolve, 100))
					channels = { ...getChannels(), ...channels }
				}
				await new Promise((resolve) => setTimeout(resolve, 500))
				return Object.keys(channels).map((key) => ({
					name: key,
					data_list_item_id: channels[key],
				}))
			}
			await new Promise((resolve) => setTimeout(resolve, 100))
			return await main()
		}, ariaLabel)
	} catch {
		return []
	}
}
