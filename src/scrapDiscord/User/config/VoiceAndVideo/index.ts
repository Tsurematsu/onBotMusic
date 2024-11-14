import type { Page } from 'puppeteer'
import selectOption from '../modules/selectOption'
import AlwaysVideo from './AlwaysVideo'
import AutomaticGain from './AutomaticGain/AutomaticGain'
import EchoCancellation from './EchoCancellation'
import HardwareAcceleration from './HardwareAcceleration'
import input from './Input'
import InputVolume from './InputVolume'
import NoiseSuppression from './NoiseSuppression'
import OutputVolume from './OutputVolume'
import Sensibility from './Sensibility'
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
	noiseSuppression: NoiseSuppression
	outputVolume: OutputVolume
	inputVolume: InputVolume
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
		this.noiseSuppression = new NoiseSuppression(page)
		this.outputVolume = new OutputVolume(page)
		this.inputVolume = new InputVolume(page)
	}
}
export default VoiceAndVideo
