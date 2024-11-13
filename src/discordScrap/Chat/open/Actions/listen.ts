import type listenChat from '@/discordScrap/modulesTop/listenChat'

export default async function listen(
	onListenChat: listenChat,
	callback: (message: string) => void,
) {
	onListenChat.listen(callback)
}
