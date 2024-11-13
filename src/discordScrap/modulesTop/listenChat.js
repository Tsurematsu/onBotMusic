// @ts-nocheck
// IMPORTANT: This function need apply the ofter functions "src\discordScrap\modules\getMessages.js"
export default async function listenChat(page) {
	return await page.evaluate(() => {
		window.listenChat = new (class {
			callbacksList = []
			start() {
				const config = {
					childList: true, // Observa cambios en hijos directos
					subtree: true, // Observa cambios en todo el árbol del contenedor
					attributes: false, // No observamos cambios de atributos
				}
				const container = document
					.querySelector('div[class*="messagesWrapper_"')
					.querySelector('ol')
				const mutationCallback = (mutationsList) => {
					for (const element of mutationsList) {
						const HTMLelement = element.addedNodes[0]
						if (HTMLelement && HTMLelement.tagName === 'LI') {
							const temMSG = window.getMessages()
							if (temMSG.length === 0) continue
							for (const callback of this.callbacksList)
								callback(temMSG[temMSG.length - 1])
							break
						}
					}
				}
				const observer = new MutationObserver(mutationCallback)
				observer.observe(container, config)
			}
			listen(callback) {
				this.callbacksList.push(callback)
			}
		})()
	})
}
