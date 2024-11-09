type MessageType = 'info' | 'error' | 'success'

interface Message {
	msg: string
	type: MessageType
}

export function print(message: Message) {
	const format_message = `${message.type}: ${message.msg}`
	console.log(format_message)
}
