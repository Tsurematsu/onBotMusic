import listServer from './listServer'
class Server {
	async select(page, nameSever) {
		const listServers = await listServer(page)
		console.log('listServers:', listServers)
	}
}
export default new Server()
