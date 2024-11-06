
export default class Client {
	cosntructor() {
		this.os = Os;
	}

	getOs(): Os {
		return process.platform;
	}
}
