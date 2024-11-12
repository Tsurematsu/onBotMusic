import config from '@/configs/config'
import dotenv from 'dotenv'
import puppeteer from 'puppeteer'
import DiscordScrap from '../discordScrap'
dotenv.config()

export default async function startup({ console_log, trowError }) {
	// SECTION :Setup ---------------------------------------------
	await config.all.load()
	const allPatch = config.all.patch()
	const configSystem = config.system.properties()
	const configChannel = config.channel.properties()
	const argumentsBrowser = config.browser.properties()
	// SECTION :Data ---------------------------------------------
	const credencial = process.env
	const nameServer = 'Programadores y Estudiantes | Comunidad de Programación'
	const nameChannel = "Tsure's Channel"
	const inputDevice = 'VB-Audio Virtual Cable'
	argumentsBrowser.headless = false
	// SECTION :Init ---------------------------------------------
	const browser = await puppeteer.launch({
		headless: false,
		devtools: false,
		userDataDir: argumentsBrowser.userDataDir,
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
		ignoreDefaultArgs: ['--enable-automation'],
	})
	const context = browser.defaultBrowserContext()
	await context.overridePermissions('https://discord.com', ['microphone'])

	const musicPage = await browser.newPage()
	const discordPage = await browser.newPage()

	// SECTION :Run ---------------------------------------------
	const discord = new DiscordScrap(discordPage)
	await discord.user.login(credencial)
	await discordPage.waitForSelector(
		'nav[aria-label="Barra lateral de servidores"]',
	)
	console.log('login', discordPage.url())

	// SECTION :Config user ---------------------------------------------
	const confUser = discord.user.config
	await confUser.open(async () => {
		await confUser.voiceAndVideo.inputVolume.set(50)
		await confUser.voiceAndVideo.outputVolume.set(0)
		await confUser.voiceAndVideo.input.setDevice(inputDevice)
		await confUser.voiceAndVideo.sensibility.set(0)
		await confUser.voiceAndVideo.alwaysVideo.disable()
		await confUser.voiceAndVideo.echoCancellation.disable()
		await confUser.voiceAndVideo.hardwareAcceleration.disable()
		await confUser.voiceAndVideo.automaticGain.disable()
		await confUser.voiceAndVideo.streamPreviews.disable()
		await confUser.voiceAndVideo.noiseSuppression.nothing()
		await new Promise((resolve) => setTimeout(resolve, 1000))
	})
	console.log('config', discordPage.url())

	// await confUser.open()

	// SECTION :Select ---------------------------------------------
	await discord.server.select(nameServer)
	console.log('server', discordPage.url())

	await discord.channel.connect(nameChannel)
	console.log('channel', discordPage.url())

	// SECTION :Testing close ---------------------------------------------
	async function testingClose(discord: DiscordScrap) {
		await new Promise((resolve) => setTimeout(resolve, 5000))
		await discord.channel.disconnect()
		console.log('disconnect', discordPage.url())
	}
	// await testingClose(discord)

	return false
}
