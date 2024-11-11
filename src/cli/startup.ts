import config from '@/configs/config'
import scraper from '@/scraper'
import writeFunction from '@/scraper/methods/writeFunction'
import puppeteer from 'puppeteer'
import handleConsole from '../scraper/methods/handleConsole'
writeFunction
export default async function startup({ console_log, trowError }) {
	// SECTION :Setup ---------------------------------------------
	await config.loadAll()
	const allPatch = config.patchAll()
	const argumentsBrowser = config.browser.properties()
	const configSystem = config.system.properties()
	const configChannel = config.channel.properties()

	// SECTION :Init ---------------------------------------------
	const browser = await puppeteer.launch(argumentsBrowser)
	const music = await browser.newPage()
	handleConsole(music, 'music')
	await new Promise((resolve) => setTimeout(resolve, 1000))
	const discord = await browser.newPage()
	handleConsole(discord, 'discord')
	writeFunction(discord)

	// SECTION :Run ---------------------------------------------
	await scraper.Login.entry(discord)
	// await system.page.discord.goto(configChannel.channelURL)

	return false
}
