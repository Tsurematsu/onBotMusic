import commands from '@/commands'
import config from '@/configs/config'
import ManagerExtension from '@/managerExtension'
import dotenv from 'dotenv'
import puppeteer from 'puppeteer'
import scrapDiscord from '../scrapDiscord'
dotenv.config()

import mpv from "node-mpv"


export default async function startup({ console_log, trowError }) {
	const mpvPlayer = new mpv({
		audio_only: true,  // Equivalente a --no-video
		auto_restart: false
	});
	mpvPlayer.setProperty('audio-device', 'wasapi/{39df27c4-7e33-4935-ae40-eb0e8067f95b}');
	mpvPlayer.volume(30)

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
	const configExtension = {
		url: extension,
		title: 'AdGuard',
	}
	const managerExtension = new ManagerExtension(configExtension)
	const browser = await puppeteer.launch({
		headless: true,
		devtools: false,
		userDataDir: dirUserData,
		args: [
			'--autoplay-policy=no-user-gesture-required',
			'--disable-web-security',
			'--disable-features=IsolateOrigins,site-per-process',
			'--no-sandbox',
			'--disable-setuid-sandbox',
			...managerExtension.argumentsBrowser,
		],
		ignoreDefaultArgs: ['--enable-automation'],
	})
	await managerExtension.make(browser)
	// SECTION :Run ---------------------------------------------
	const discord = await new scrapDiscord().make(browser)
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
	}
	// SECTION :Select ----------------------------------------------------
	await discord.server.select(nameServer)
	const connected = await discord.channel.connect(nameChannel)
	console.log('channel [', connected, ']', discord.page.url())
	if (!connected) return
	// SECTION :Chat ------------------------------------------------------
	await discord.chat.microphone.unMute()
	await discord.chat.open(async (actions) => {
		console.log('chat ready')
		actions.listen((data) => commands(data, actions, mpvPlayer))
	})
	// SECTION :End ------------------------------------------------------
	await discord.channel.disconnect()
	await discord.close()
	browser.close()
	return false
}
