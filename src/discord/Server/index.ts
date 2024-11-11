import listServer from './listServer'
class Server {
	async select(page, nameSever) {
		const listServers = await listServer(page)
		const { data_list_item_id } = listServers.find((server) =>
			server.name.includes(nameSever),
		)
		await page.click(`div[data-list-item-id="${data_list_item_id}"]`)
	}
	async list(page) {
		return await listServer(page)
	}
}
export default new Server()
