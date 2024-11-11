import Channel from './Channel'
import Server from './Server'
import User from './User'
const discord = {
	server: (page) => new Server(page),
	channel: Channel,
	user: (page) => new User(page),
}
export default discord
