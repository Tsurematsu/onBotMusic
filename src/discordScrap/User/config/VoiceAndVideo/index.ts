import type { Page } from 'puppeteer'
import selectOption from '../modules/selectOption'
import AlwaysVideo from './AlwaysVideo'
import EchoCancellation from './EchoCancellation'
import HardwareAcceleration from './HardwareAcceleration'
import input from './Input'
import Sensibility from './Sensibility'
class VoiceAndVideo {
	private page: Page
	input: input
	sensibility: Sensibility
	alwaysVideo: AlwaysVideo
	echoCancellation: EchoCancellation
	hardwareAcceleration: HardwareAcceleration
	into = async () => {
		await selectOption(this.page, 'Voz y vídeo')
	}
	constructor(page) {
		this.page = page
		this.input = new input(page)
		this.sensibility = new Sensibility(page)
		this.alwaysVideo = new AlwaysVideo(page)
		this.echoCancellation = new EchoCancellation(page)
		this.hardwareAcceleration = new HardwareAcceleration(page)
	}
}
export default VoiceAndVideo
