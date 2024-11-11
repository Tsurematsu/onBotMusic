import listChannel from './listChannels'
class Channel {
	listChannels = []
	async select(page, nameChannel) {
		this.listChannels = await listChannel(page)
		const { data_list_item_id } = this.listChannels.find((server) =>
			server.name.includes(nameChannel),
		)
		await page.click(`a[data-list-item-id="${data_list_item_id}"]`)
	}
	async getList(page) {
		return await listChannel(page)
	}
}
export default new Channel()
