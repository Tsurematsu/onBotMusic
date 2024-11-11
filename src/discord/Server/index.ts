import Select from './Select'
import listServer from './listServer'
class Server {
	listServers = []
	page
	constructor(page) {
		this.page = page
	}
	select = (page) => new Select(this.page).main
	async list(page) {
		return await listServer(page)
	}
}
export default Server
