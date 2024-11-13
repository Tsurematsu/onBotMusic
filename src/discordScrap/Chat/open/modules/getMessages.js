// @ts-nocheck

function main() {
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
		}
		if (headerItem) {
			const selectorUsername = 'span[id*="message-username-"]'
			const selectorDate = 'span[class*="timestamp_"]'
			header.username = headerItem.querySelector(selectorUsername).innerText
			if (header.username === 'average discor d user')
				header.username = cacheHeader.username
			header.date = headerItem.querySelector(selectorDate).innerText
			header.date = header.date.replaceAll('\n', '').replaceAll('—', '')
			header.date = String(header.date).trim()
			cacheHeader = header
		} else header = cacheHeader
		const { username, date } = header
		const messageItem = { username, date, message }
		messages.push(messageItem)
	}
	return messages
}
