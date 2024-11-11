import config from '@/configs/config'
import dotenv from 'dotenv'
import puppeteer from 'puppeteer'
import DiscordScrap from '../discordScrap'
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
	const discord = new DiscordScrap(discordPage)
	await discord.user.login(credencial)
	console.log('login', discordPage.url())

	// SECTION :Config user ---------------------------------------------
	const confUser = discord.user.config
	await confUser.open()
	await confUser.voiceAndVideo.input.getDevices()
	// await discord.user.config.close()
	// SECTION :Select ---------------------------------------------
	// await discord.server.select(nameServer)
	// console.log('server', discordPage.url())
	// await discord.channel.select(nameChannel)
	return false
}
