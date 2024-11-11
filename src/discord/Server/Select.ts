import listServer from './listServer'
class Select {
	page
	listServers = []
	constructor(page) {
		this.page = page
	}
	async main(nameSever) {
		this.listServers = await listServer(this.page)
		const { data_list_item_id } = this.listServers.find((server) =>
			server.name.includes(nameSever),
		)
		await this.page.click(`div[data-list-item-id="${data_list_item_id}"]`)
	}
}
export default Select
