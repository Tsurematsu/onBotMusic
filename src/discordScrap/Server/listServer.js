export default async function listServer(page) {
	try {
		// @ts-ignore
		const { window } = Object
		await page.waitForSelector('div[aria-label="Servidores"]')
		return await page.evaluate(() => {
			const divServer = document.querySelectorAll(
				'div[aria-label="Servidores"]',
			)[0]
			const elements = divServer.querySelectorAll('div')
			const list = []
			for (const element of Array.from(elements)) {
				const data_list_item_id = element.getAttribute('data-list-item-id')
				if (data_list_item_id) {
					// @ts-ignore
					const ariaLabel = element.getAttribute('aria-label').trim()
					if (ariaLabel === null) break
					const prefijo = ariaLabel.split(',')
					const idKey =
						prefijo.length > 1
							? ariaLabel.slice(prefijo[0].length + 1).trim()
							: ariaLabel
					list.push({
						name: idKey.replaceAll('"', '').trim(),
						data_list_item_id,
					})
				}
			}
			window.listChannels = list
			return list
		})
	} catch {
		return []
	}
}
