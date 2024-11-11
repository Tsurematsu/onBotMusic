export default async function listChannels(page, ariaLabel = 'Canales') {
	try {
		// @ts-ignore
		const { window } = Object
		await page.waitForSelector(`ul[aria-label="${ariaLabel}"]`)
		return await page.evaluate((ariaLabel) => {
			const divServer = document.querySelectorAll(
				`ul[aria-label="${ariaLabel}"]`,
			)[0]
			const elements = divServer.querySelectorAll('li')
			const channels = []
			for (const li of Array.from(elements)) {
				const attribute = li.getAttribute('data-dnd-name')
				if (attribute) {
					const aElement = li.querySelectorAll('a')[0]
					if (aElement) {
						channels.push({
							name: attribute,
							data_list_item_id: aElement?.getAttribute('data-list-item-id'),
						})
					}
				}
			}
			return channels
		}, ariaLabel)
	} catch {
		return []
	}
}
