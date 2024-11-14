// IMPORTANT: This function need apply the ofter functions "src\discordScrap\modules\getMessages.js"
export interface dataMessage {
	username: string
	date: string
	message: string
	id: string
}
export default class ListenChat {
	page
	callbackList = []
	constructor(page) {
		this.page = page
	}
	async start() {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const { window } = Object as any
		const page = this.page
		await page.exposeFunction('listenChat_event', (dataMessage) => {
			for (const callback of this.callbackList) callback(dataMessage)
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
					let dataReceived = null
					for (const element of mutationsList) {
						const HTMLelement = element.addedNodes[0]
						if (HTMLelement && HTMLelement.tagName === 'LI') {
							const temMSG = window.getMessages()
							dataReceived = temMSG[temMSG.length - 1]
							break
						}
					}
					console.log('----> [request] => ', dataReceived)
					if (dataReceived) window.listenChat_event(dataReceived)
				}
				// -------------------------------------------------
				const observer = new MutationObserver(mutationCallback)
				observer.observe(container, config)
			}
			window.listenChat()
			return true
		})
		return this
	}
	listen(callback: (dataMessage) => void) {
		this.callbackList.push(callback)
	}
}
