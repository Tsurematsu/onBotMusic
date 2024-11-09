// NOTE : this file has unused
import xdg from '@folder/xdg'

export default class Path {
	path_cache: string
	path_config: string
	path_users: string
	constructor() {
		this.path_cache = xdg.cache()
		this.path_config = xdg.config()
		this.path_users = xdg.data()
	}

	getCache(): string {
		return this.path_cache
	}

	getConfig(): string {
		return this.path_config
	}

	getUsers(): string {
		return this.path_users
	}
}
