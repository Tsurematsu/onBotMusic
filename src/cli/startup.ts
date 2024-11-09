import config from '@/configs/config'
import system from '@/const/system'
import puppeteer from 'puppeteer'
export default async function startup({ console_log, trowError }) {
	// SECTION :Setup ---------------------------------------------
	await config.loadAll()
	const allPatch = config.patchAll()
	const argumentsBrowser = config.browser.properties()
	const configSystem = config.system.properties()
	const configChannel = config.channel.properties()

	// SECTION :Init ---------------------------------------------
	system.browser = await puppeteer.launch(argumentsBrowser)

	// SECTION :Run ---------------------------------------------
	return false
}
