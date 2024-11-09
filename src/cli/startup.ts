// import {deleteJson, readJson, writeJson} from "./utils/json";
import config from '@/configs/config'
import puppeteer from 'puppeteer'
export default async function startup({ console_log, trowError }) {
	await config.browser.load()
	console.log()
	// SECTION :Setup ---------------------------------------------
	const argumentsBrowser = config.browser.properties()
	const browser = await puppeteer.launch(argumentsBrowser)
	return false
}
