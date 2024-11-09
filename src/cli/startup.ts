import config from '@/configs/config'
import puppeteer from 'puppeteer'
export default async function startup({ console_log, trowError }) {
	// SECTION :Setup ---------------------------------------------
	await config.loadAll()
	const allPatch = config.patchAll()
	const argumentsBrowser = config.browser.properties()
	const configSystem = config.system.properties()
	const configUser = config.user.properties()

	// SECTION :Init ---------------------------------------------
	const browser = await puppeteer.launch(argumentsBrowser)

	// SECTION :Run ---------------------------------------------
	return false
}
