import Login from './Login'
class User {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	page: any
	login
	constructor(page) {
		this.page = page
		this.login = new Login(page)
	}
}
export default User
