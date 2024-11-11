import config from '@/configs/config'
import puppeteer from 'puppeteer'
import scraper from '../scraper'
export default async function startup({ console_log, trowError }) {
	// SECTION :Setup ---------------------------------------------
	await config.all.load()
	const allPatch = config.all.patch()
	const argumentsBrowser = config.browser.properties()
	const configSystem = config.system.properties()
	const configChannel = config.channel.properties()
	argumentsBrowser.headless = false
	// SECTION :Init ---------------------------------------------
	const browser = await puppeteer.launch(argumentsBrowser)

	const music = await browser.newPage()
	const discord = await browser.newPage()

	// SECTION :Run ---------------------------------------------
	await scraper.Client.login(discord)
	return false
}
