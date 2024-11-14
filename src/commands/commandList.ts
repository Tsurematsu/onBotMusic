import type Actions from '@/scrapDiscord/Chat/open/Actions'
import type { dataMessage } from '@/scrapDiscord/modulesTop/listenChat'
import type scrapYoutube from '@/scrapYoutube'

export default class commandList {
	data: dataMessage
	actions: Actions
	YouTube: scrapYoutube
	constructor(data: dataMessage, actions: Actions, YouTube: scrapYoutube) {
		this.data = data
		this.actions = actions
		this.YouTube = YouTube
	}
	async hola(msg = null) {
		await this.actions.send('Hola, ¿en qué puedo ayudarte?')
	}
	async close(msg = null) {
		if (this.data.username === 'Tsure') {
			await this.actions.send('Okay me desconecto')
			this.actions.end()
			return
		}
		await this.actions.send('No quiero hacerte caso')
	}
	async play(msg = null) {
		if (msg === null) {
			await this.actions.send('No se ha encontrado el mensaje')
			return
		}
		if (msg.includes('youtube.com')) {
			await this.actions.send('Okay, lo busco')
			const anuncios = await this.YouTube.goto(msg)
			if (anuncios > 0) {
				await this.actions.send(`He encontrado ${anuncios} anuncios`)
			} else {
				await this.actions.send('Listo, lo he encontrado')
			}
			return
		}
		await this.actions.send('No se ha encontrado el video')
	}
	async pause(msg = null) {
		await this.YouTube.actions.pause()
		await this.actions.send('Pausado')
	}
	async volume(msg = null) {
		const volume = Number.parseInt(msg)
		// biome-ignore lint/suspicious/noGlobalIsNan: <explanation>
		if (isNaN(volume)) {
			await this.actions.send('Prefiero que me digas un número, entre 0 y 100')
			return
		}
		if (volume < 0 || volume > 100) {
			await this.actions.send('El número debe estar entre 0 y 100')
			return
		}
		await this.YouTube.actions.setVolume(volume)
		await this.actions.send(`Volumen cambiado a ${volume}`)
	}
}
