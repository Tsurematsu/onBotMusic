import type { User, Os } from "../types/user";
import type { Config } from "../types/config";

export default class Client implements User {
	os: Os;
	config: Config;
	constructor(os: Os, config: Config) {
		this.os = os;
		this.config = config;
	}

	getOs(): Os {
		this.os = process.platform as Os;
		return this.os;
	}

	getConfig(): Config {
		return this.config;
	}

	setup() {
		// TODO: Implement setup method
	}
}
