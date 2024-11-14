import type { Browser } from 'puppeteer'

export default class scrapYoutube {
	async make(browser: Browser) {
		return this
	}
}

// const musicPage = await browser.newPage()
// await musicPage.goto('https://www.youtube.com/watch?v=Fg_zw476KfE', {
// 	waitUntil: 'networkidle2',
// })
// await musicPage.bringToFront()

// return
