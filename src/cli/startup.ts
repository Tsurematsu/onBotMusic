import config from '@/configs/config'
import dotenv from 'dotenv'
import puppeteer from 'puppeteer'
import discord from '../discord'
dotenv.config()
export default async function startup({ console_log, trowError }) {
	// SECTION :Setup ---------------------------------------------
	const credencial = process.env
	await config.all.load()
	const allPatch = config.all.patch()
	const argumentsBrowser = config.browser.properties()
	const configSystem = config.system.properties()
	const configChannel = config.channel.properties()
	const nameServer = 'Programadores y Estudiantes | Comunidad de Programación'
	const nameChannel = "Tsure's Channel"
	argumentsBrowser.headless = false

	// SECTION :Init ---------------------------------------------
	const browser = await puppeteer.launch({
		headless: false,
		devtools: false,
		userDataDir: argumentsBrowser.userDataDir,
		args: [
			'--use-fake-ui-for-media-stream', // Simula el acceso a medios como el micrófono y cámara
		],
	})

	const musicPage = await browser.newPage()
	const discordPage = await browser.newPage()

	// SECTION :Run ---------------------------------------------
	// await discord.login(discordPage, credencial)
	await discord.user(discordPage).login(credencial)
	console.log('login', discordPage.url())
	await discord.server(discordPage).select(nameServer)
	console.log('server', discordPage.url())
	await discord.channel(discordPage).select(nameChannel)
	console.log('channel', discordPage.url())
	return false
}
