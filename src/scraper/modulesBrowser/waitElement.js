class WaitElement {
	#searchElement = () => false
	#stopFlag = false
	#timeout = 1000
	#resolve = () => {}
	#tag = ''
	constructor(callback, timeout, tag) {
		this.#searchElement = callback
		this.#timeout = timeout
		this.#tag = tag
	}
	async exist(callback) {
		function loop(resolve, search, time, callback) {}
		return await new Promise((r) =>
			loop(r, this.#searchElement, this.#timeout, callback),
		)
	}
	cancel() {
		this.#stopFlag = true
		this.#resolve()
	}
	async reset(callback) {
		this.#stopFlag = false
		this.#resolve = () => {}
		await this.exist(callback)
	}
}
