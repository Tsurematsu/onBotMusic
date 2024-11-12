import type { Page } from 'puppeteer'
import listChannel from './modules/listChannels'
export default async function connect(page: Page, channelName: string) {
	const listChannels = await listChannel(page)
	let data_list_item_id = null
	for (const element of listChannels) {
		if (element.name.includes(channelName)) {
			data_list_item_id = element.data_list_item_id
			break
		}
	}
	if (data_list_item_id === null) {
		return false
	}
	await page.click(`a[data-list-item-id="${data_list_item_id}"]`)
	return true
}
