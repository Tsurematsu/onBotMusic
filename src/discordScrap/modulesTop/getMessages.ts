// @ts-nocheck
export default async function getMessages(page) {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const { window } = Object as any
	return page.evaluate(() => {
		window.getMessages = () => {
			try {
				const parent = document.querySelector('div[class*="messagesWrapper_" ]')
				const itemsChat = parent.querySelectorAll(
					'li[class*="messageListItem"]',
				)
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
						header.username =
							headerItem.querySelector(selectorUsername).innerText
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
	})
}
