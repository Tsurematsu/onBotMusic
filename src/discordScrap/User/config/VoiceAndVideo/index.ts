import type { Page } from 'puppeteer'
import selectOption from '../modules/selectOption'
import AlwaysVideo from './AlwaysVideo'
import AutomaticGain from './AutomaticGain/AutomaticGain'
import EchoCancellation from './EchoCancellation'
import HardwareAcceleration from './HardwareAcceleration'
import input from './Input'
import Sensibility from './Sensibility'
import noiseSuppression from './noiseSuppression'
import streamPreviews from './streamPreviews'
class VoiceAndVideo {
	private page: Page
	input: input
	sensibility: Sensibility
	alwaysVideo: AlwaysVideo
	echoCancellation: EchoCancellation
	hardwareAcceleration: HardwareAcceleration
	automaticGain: AutomaticGain
	streamPreviews: streamPreviews
	noiseSuppression: noiseSuppression
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
		this.automaticGain = new AutomaticGain(page)
		this.streamPreviews = new streamPreviews(page)
		this.noiseSuppression = new noiseSuppression(page)
	}
}
export default VoiceAndVideo
