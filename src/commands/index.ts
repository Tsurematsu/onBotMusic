import type Actions from '@/scrapDiscord/Chat/open/Actions'
import type { dataMessage } from '@/scrapDiscord/modulesTop/listenChat'
import type scrapYoutube from '@/scrapYoutube'
import commandList from './commandList'
const ticket = '@Asuna'
export default function commands(
	data: dataMessage,
	actions: Actions,
	YouTube: scrapYoutube,
) {
	const commandsList = new commandList(data, actions, YouTube)
	const extractTicket = data.message.slice(0, ticket.length)
	const extractCommand = data.message.slice(ticket.length)
	const command = extractCommand.trim().split(' ')[0].toLowerCase()
	const message = data.message.slice(ticket.length + command.length + 2).trim()
	if (extractTicket === ticket) commandsList[command]?.(message)
}
