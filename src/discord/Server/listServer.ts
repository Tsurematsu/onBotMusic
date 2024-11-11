export default async function listServer(page) {
	try {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const { WaitElement, window } = Object as any
		await page.waitForSelector('div[aria-label="Servidores"]')
		return await page.evaluate(() => {
			const divServer = document.querySelectorAll(
				'div[aria-label="Servidores"]',
			)[0]
			const elements = divServer.querySelectorAll('div')
			const list = new Map()
			for (const element of Array.from(elements)) {
				const data_list_item_id = element.getAttribute('data-list-item-id')
				if (data_list_item_id) {
					const ariaLabel = element.getAttribute('aria-label')
					if (ariaLabel === null) break
					list.set(ariaLabel, element)
				}
			}
			window.listChannels = list
			return list
		})
	} catch {
		return []
	}
}
