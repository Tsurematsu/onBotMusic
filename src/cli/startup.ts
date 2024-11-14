// PENDING: 8. Prevenir cerrado de chat si se intenta reabrir
// PENDING: 1. Crear un sistema de comandos para el bot
// PENDING: 2. Crear un sistema de configuración para el bot
// PENDING: 3. Crear un sistema de eventos para el bot
// PENDING: 4. Crear un sistema de almacenamiento para el bot
// PENDING: 5. Crear un sistema de logs para el bot
// PENDING: 6. Crear un sistema de errores para el bot
// PENDING: 7. Crear un sistema de mensajes para el bot
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
	const extension = 'C:\\Users\\danie\\Documents\\AdGuard'
	const dirUserData = 'C:\\Users\\danie\\Documents\\CHROMIUN'
	argumentsBrowser.headless = false

	// SECTION :Init ---------------------------------------------
	const browser = await puppeteer.launch({
		headless: false,
		devtools: false,
		// userDataDir: dirUserData,
		args: [
			'--no-sandbox',
			'--disable-setuid-sandbox',
			`--disable-extensions-except=${extension}`,
			`--load-extension=${extension}`,
		],
		ignoreDefaultArgs: ['--enable-automation'],
	})

	browser.on('targetcreated', async (target) => {
		if (target.type() === 'page') {
			const page = await target.page()
			await page.waitForNavigation({ waitUntil: 'domcontentloaded' })
			if ((await page.title()).includes('AdGuard')) await page.close()
		}
	})

	const musicPage = await browser.newPage()
	await musicPage.goto('https://www.youtube.com/watch?v=Fg_zw476KfE')

	return
	// SECTION :Run ---------------------------------------------
	const discord = await new DiscordScrap().make(browser)
	const onLogin = await discord.user.login(credencial)
	console.log('login [', onLogin, ']', discord.page.url())

	// SECTION :Config user ---------------------------------------------
	if (!onLogin) {
		const confUser = discord.user.config
		await confUser.open(async () => {
			console.log('config open', discord.page.url())

			await confUser.voiceAndVideo.inputVolume.set(50)
			console.log('[config] inputVolume')

			await confUser.voiceAndVideo.outputVolume.set(0)
			console.log('[config] outputVolume')

			await confUser.voiceAndVideo.input.setDevice(inputDevice)
			console.log('[config] input')

			await confUser.voiceAndVideo.sensibility.set(0)
			console.log('[config] sensibility')

			await confUser.voiceAndVideo.alwaysVideo.disable()
			console.log('[config] alwaysVideo')

			await confUser.voiceAndVideo.echoCancellation.disable()
			console.log('[config] echoCancellation')

			await confUser.voiceAndVideo.hardwareAcceleration.disable()
			console.log('[config] hardwareAcceleration')

			await confUser.voiceAndVideo.automaticGain.disable()
			console.log('[config] automaticGain')

			await confUser.voiceAndVideo.streamPreviews.disable()
			console.log('[config] streamPreviews')

			await confUser.voiceAndVideo.noiseSuppression.nothing()
			console.log('[config] noiseSuppression')
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
		console.log('chat ready')
		actions.listen((data) => {
			const commands = async () => {
				if (data.message.includes('@Asuna')) {
					if (data.message.includes('close') && data.username === 'Tsure') {
						await actions.send('Okay me desconecto')
						actions.end()
						return
					}
					if (data.message.includes('Hola')) {
						await actions.send('Hola, ¿en qué puedo ayudarte?')
						return
					}
				}
			}
			commands()
		})
	})

	// SECTION :End ------------------------------------------------------

	await discord.channel.disconnect()
	console.log('disconnect', discord.page.url())

	await discord.close()
	console.log('close', discord.page.url())

	browser.close()
	console.log('close browser')
	return false
}
