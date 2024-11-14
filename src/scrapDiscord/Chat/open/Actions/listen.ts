import type ListenChat from '@/scrapDiscord/modulesTop/listenChat'
import type { dataMessage } from '@/scrapDiscord/modulesTop/listenChat'

export default async function listen(
	onListenChat: ListenChat,
	callback: (message: dataMessage) => void,
) {
	onListenChat.listen(callback)
}
