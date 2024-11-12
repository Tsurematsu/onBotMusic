import Select from './Select'
import disconnect from './disconnect'
import listChannel from './modules/listChannels'
class Channel {
	listChannels = []
	page
	select
	disconnect
	constructor(page) {
		this.page = page
		this.disconnect = async () => await disconnect(page)
		this.select = new Select(page).main
	}
	async getList() {
		return await listChannel(this.page)
	}
}
export default Channel
