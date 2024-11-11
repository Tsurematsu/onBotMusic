import Select from './Select'
import listChannel from './listChannels'
class Channel {
	listChannels = []
	page
	select
	constructor(page) {
		this.page = page
		this.select = new Select(page).main
	}
	async getList() {
		return await listChannel(this.page)
	}
}
export default Channel
