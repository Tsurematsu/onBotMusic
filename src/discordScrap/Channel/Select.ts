// DEPRECATED : This file is deprecated and will be removed in the future. Please use the new version of this file located in src/discordScrap/Channel/connect.ts (function (page, channelName):boolean) )
import listChannel from './modules/listChannels'
class Select {
	listChannels = []
	page
	constructor(page) {
		this.page = page
	}
	async main(nameChannel) {
		this.listChannels = await listChannel(this.page)
		let data_list_item_id = null
		for (const element of this.listChannels) {
			if (element.name.includes(nameChannel)) {
				data_list_item_id = element.data_list_item_id
				break
			}
		}
		if (data_list_item_id === null) {
			return false
		}
		await this.page.click(`a[data-list-item-id="${data_list_item_id}"]`)
		return true
	}
}
export default Select
