import Select from './Select'
import listServer from './modules/listServer'
class Server {
	listServers = []
	page
	select
	constructor(page) {
		this.page = page
		this.select = new Select(page).main
	}
	async list(page) {
		return await listServer(page)
	}
}
export default Server
