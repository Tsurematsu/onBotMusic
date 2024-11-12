import connect from './connect'
import disconnect from './disconnect'
import listChannel from './modules/listChannels'
class Channel {
	listChannels = []
	page
	disconnect: typeof disconnect
	connect
	constructor(page) {
		this.page = page
		this.disconnect = async () => await disconnect(page)
		this.connect = async (name: string) => await connect(page, name)
	}
	async getList() {
		return await listChannel(this.page)
	}
}
export default Channel
