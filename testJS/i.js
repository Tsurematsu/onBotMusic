// @ts-nocheck
window.getMessages = () => {
	try {
		const parent = document.querySelector('div[class*="messagesWrapper_" ]')
		const itemsChat = parent.querySelectorAll('li[class*="messageListItem"]')
		const messages = []
		let cacheHeader = {}
		for (const itemChat of itemsChat) {
			let message = itemChat.querySelector('div[id*="message-"]').innerText
			if (message.length === 0) continue
			message = String(message).trim()
			message = message.replaceAll('\n', ' ')
			const selectoHeaderItem = 'h3[aria-labelledby*="message-username-"]'
			const headerItem = itemChat.querySelector(selectoHeaderItem)
			let header = {
				username: 'anonymous',
				date: 'unknown',
				id: 'unknown',
			}
			header.date = itemChat.querySelector('time').getAttribute('datetime')
			header.id = itemChat.id
			if (headerItem) {
				const selectorUsername = 'span[id*="message-username-"]'
				header.username = headerItem.querySelector(selectorUsername).innerText
				if (header.username === 'average discor d user')
					header.username = cacheHeader.username
				cacheHeader = header
			} else header = cacheHeader
			const { username, date, id } = header
			const messageItem = { username, date, message, id }
			messages.push(messageItem)
		}
		return messages
	} catch {
		return []
	}
}

window.listenChat = new (class {
	callbacksList = []
	listen() {
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
	onMessage(callback) {
		this.callbacksList.push(callback)
	}
})()

window.listenChat.listen()
window.listenChat.onMessage((msg) => {
	console.log('[response] ----> ', msg)
})
