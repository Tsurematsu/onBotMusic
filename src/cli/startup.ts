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
	const inputDevice = 'VB-Audio Virtual Cable'
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
	await confUser.open(async () => {
		console.log('open config')
		await confUser.voiceAndVideo.into()
		const selected0 = await confUser.voiceAndVideo.input.getSelected()
		console.log('selected', selected0)
		await confUser.voiceAndVideo.input.setDevice(inputDevice)
		const selected1 = await confUser.voiceAndVideo.input.getSelected()
		console.log('selected', selected1)
	})

	// SECTION :Select ---------------------------------------------
	// await discord.server.select(nameServer)
	// console.log('server', discordPage.url())
	// await discord.channel.select(nameChannel)
	return false
}
