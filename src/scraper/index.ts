import Login from './Login'
import entryChannel from './entryChannel'
import entryChat from './entryChat'
import getPerfil from './getPerfil'
import onMessage from './onMessage'
const scraper = {
	entryChannel: new entryChannel(),
	entryChat: new entryChat(),
	getPerfil: new getPerfil(),
	Login: new Login(),
	onMessage: new onMessage(),
}
export default scraper
