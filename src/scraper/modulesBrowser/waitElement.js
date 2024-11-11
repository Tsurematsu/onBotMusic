class WaitElement {
	#searchElement = () => false
	#stopFlag = false
	#timeout = 1000
	#tag = ''
	constructor(callback, timeout, tag) {
		this.#searchElement = callback
		this.#timeout = timeout
		this.#tag = tag
	}
	async exist(callback) {
		async function loop(resolve, search, time, callback) {
			await new Promise((r) => setTimeout(r, time))
			const element = search()
			if (!element) {
				loop(resolve, search, time, callback)
				return
			}
			if (callback) callback(element)
			resolve(element)
		}
		return await new Promise((r) =>
			loop(r, this.#searchElement, this.#timeout, callback),
		)
	}
	cancel() {
		this.#stopFlag = true
	}
	async reset(callback) {
		this.#stopFlag = false
		await this.exist(callback)
	}
}
