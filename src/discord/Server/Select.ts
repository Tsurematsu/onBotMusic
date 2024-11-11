import listServer from './listServer'
class Select {
	page
	listServers = []
	constructor(page) {
		this.page = page
	}
	async main(nameSever) {
		this.listServers = await listServer(this.page)
		let data_list_item_id = null
		for (const element of this.listServers) {
			if (element.name.includes(nameSever)) {
				data_list_item_id = element.data_list_item_id
				break
			}
		}
		if (data_list_item_id === null) {
			return false
		}
		await this.page.click(`div[data-list-item-id="${data_list_item_id}"]`)
		return true
	}
}
export default Select
