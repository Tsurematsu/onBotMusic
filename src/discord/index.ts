import Channel from './Channel'
import Server from './Server'
import User from './User'
const discord = {
	server: (page) => new Server(page),
	channel: (page) => new Channel(page),
	user: (page) => new User(page),
}
export default discord
