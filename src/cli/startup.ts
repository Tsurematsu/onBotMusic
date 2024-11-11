import config from '@/configs/config'
import system from '@/const/system'
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
	system.browser = await puppeteer.launch(argumentsBrowser)
	system.page.music = await system.browser.newPage()
	handleConsole(system.page.music, 'music')
	await new Promise((resolve) => setTimeout(resolve, 1000))
	system.page.discord = await system.browser.newPage()
	handleConsole(system.page.discord, 'discord')
	writeFunction(system.page.discord)
	await scraper.Login.entry()
	// await system.page.discord.goto(configChannel.channelURL)

	// SECTION :Run ---------------------------------------------
	return false
}
