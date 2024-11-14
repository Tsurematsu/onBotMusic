import type Actions from '@/scrapDiscord/Chat/open/Actions'
import type { dataMessage } from '@/scrapDiscord/modulesTop/listenChat'
import type scrapYoutube from '@/scrapYoutube'
const ticket = '@Asuna '
export default async function commands(
	data: dataMessage,
	actions: Actions,
	YouTube: scrapYoutube,
) {
	const commandsList = {
		Hola: () => {
			actions.send('Hola, ¿en qué puedo ayudarte?')
		},
		close: 'Okay me desconecto',
	}
	if (data.message.slice(ticket.length) === ticket)
		commandsList[data.message.slice(ticket.length, data.message.length)]?.()
	// await actions.send('Okay me desconecto')
	// actions.end()
}
