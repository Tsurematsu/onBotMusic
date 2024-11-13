import type ListenChat from '@/discordScrap/modulesTop/listenChat'
import type { dataMessage } from '@/discordScrap/modulesTop/listenChat'

export default async function listen(
	onListenChat: ListenChat,
	callback: (message: dataMessage) => void,
) {
	onListenChat.listen(callback)
}
