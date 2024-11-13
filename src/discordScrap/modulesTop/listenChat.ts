// IMPORTANT: This function need apply the ofter functions "src\discordScrap\modules\getMessages.js"
export default class listenChat {
	page
	callbackList = []
	constructor(page) {
		this.page = page
	}
	async start() {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const { window } = Object as any
		const page = this.page
		await page.exposeFunction('listenChat_event', async (message) => {
			for (const callback of this.callbackList) callback(message)
		})
		await page.evaluate(() => {
			window.listenChat = () => {
				// -------------------------------------------------
				const config = {
					childList: true, // Observa cambios en hijos directos
					subtree: true, // Observa cambios en todo el árbol del contenedor
					attributes: false, // No observamos cambios de atributos
				}
				// -------------------------------------------------
				const container = document
					.querySelector('div[class*="messagesWrapper_"')
					.querySelector('ol')
				// -------------------------------------------------
				const mutationCallback = (mutationsList) => {
					for (const element of mutationsList) {
						const HTMLelement = element.addedNodes[0]
						if (HTMLelement && HTMLelement.tagName === 'LI') {
							const temMSG = window.getMessages()
							if (temMSG.length === 0) continue
							window.listenChat_event(temMSG[temMSG.length - 1])
							break
						}
					}
				}
				// -------------------------------------------------
				const observer = new MutationObserver(mutationCallback)
				observer.observe(container, config)
			}
		})
		return this
	}
	listen(callback) {
		this.callbackList.push(callback)
	}
}
