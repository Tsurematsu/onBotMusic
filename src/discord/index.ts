import Channel from './Channel'
import Server from './Server'
import User from './User'
const discord = {
	server: Server,
	channel: Channel,
	user: (page) => new User(page),
}
export default discord
