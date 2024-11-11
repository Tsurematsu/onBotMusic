class WaitElement {
	#searchElement = () => false
	#stopFlag = false
	#timeout = 1000
	#tag = ''
	constructor(searchElement, timeout, tag) {
		this.#searchElement = searchElement
		this.#timeout = timeout
		this.#tag = tag // flag console.log(tag, "hola mundo")
	}
	async exist(isOk) {
		async function loop(resolve, search, time, isOk) {
			await new Promise((r) => setTimeout(r, time))
			const element = search()
			if (!element) {
				loop(resolve, search, time, isOk)
				return
			}
			if (isOk) isOk(element)
			resolve(element)
		}
		return await new Promise((resolve) => {
			loop(resolve, this.#searchElement, this.#timeout, isOk)
			// loop.bind(this, r, callback)
		})
	}
	cancel() {
		this.#stopFlag = true
	}
	async reset(callback) {
		this.#stopFlag = false
		await this.exist(callback)
	}
}
