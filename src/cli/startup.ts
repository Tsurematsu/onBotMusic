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
	// const musicPage = await browser.newPage()

	// SECTION :Run ---------------------------------------------
	const discord = await new DiscordScrap().make(browser)
	const onLogin = await discord.user.login(credencial)
	console.log('login [', onLogin, ']', discord.page.url())

	// SECTION :Config user ---------------------------------------------
	if (!onLogin) {
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
		})
		console.log('config', discord.page.url())
	}

	// SECTION :Select ----------------------------------------------------
	await discord.server.select(nameServer)
	console.log('server', discord.page.url())

	await discord.channel.connect(nameChannel)
	console.log('channel', discord.page.url())

	// SECTION :Chat ------------------------------------------------------
	await discord.chat.microphone.unMute()
	console.log('microphone unmute')

	await discord.chat.open(async (actions) => {
		// const messages = await actions.messages()
		// console.log('messages:', messages)
		actions.listen((data) => {
			console.log('message:', data.message)
		})
	})

	// SECTION :Testing close ---------------------------------------------
	async function testingClose(discord: DiscordScrap) {
		await new Promise((resolve) => setTimeout(resolve, 5000))
		await discord.channel.disconnect()
		console.log('disconnect', discord.page.url())
	}
	// await testingClose(discord)
	return false
}
