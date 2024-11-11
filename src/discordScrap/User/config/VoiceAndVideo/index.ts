import type { Page } from 'puppeteer'
import Media from './Media'

class VoiceAndVideo {
	private page: Page
	media: Media
	constructor(page) {
		this.page = page
		this.media = new Media(page)
	}
}
export default VoiceAndVideo
