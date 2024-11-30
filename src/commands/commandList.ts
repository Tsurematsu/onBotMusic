import type Actions from '@/scrapDiscord/Chat/open/Actions';
import type { dataMessage } from '@/scrapDiscord/modulesTop/listenChat';


export default class commandList {
	data: dataMessage
	actions: Actions
	mpvPlayer
	constructor(data: dataMessage, actions: Actions, mpvPlayer) {
		this.data = data
		this.actions = actions
		this.mpvPlayer = mpvPlayer
	}
	async hola(msg = null) {
		await this.actions.send('Hola, ¿en qué puedo ayudarte?')
	}
	async close(msg = null) {
		if (this.data.username === 'Tsure') {
			await this.actions.send('Okay me desconecto')
			await this.mpvPlayer.quit();
			this.actions.end()
			return
		}
		await this.actions.send('No quiero hacerte caso')
	}
	async play(msg = null) {
		if (msg === null || msg === '') {
			await this.mpvPlayer.play()
			return
		}
		if (msg.includes('youtube.com')) {
			await this.actions.send('Okay, lo busco')
			await this.mpvPlayer.load(msg);
			console.log("reproducing....");
			await this.actions.send('Listo, lo he encontrado')
			return
		}
		await this.actions.send('No se ha encontrado el video')
	}
	async pause(msg = null) {
		await this.mpvPlayer.pause()
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
		await this.mpvPlayer.volume(volume)
		await this.actions.send(`Volumen cambiado a ${volume}`)
	}
}
