import path from 'node:path'
import { killDir, path_config } from '../utils/cPath'
import { deleteJson, readJson, verifyJsonFile, writeJson } from '../utils/json'

class UserConfig {
	nameConfig = 'default'
	channelURL =
		'https://discord.com/channels/768278151435386900/1304620300364943431'
	channelName = "Tsure's Channel"
	botName = 'Asuna'
	botTag = 'bot'
	prefix = '!'
	scrollSelector =
		'.scroller_c43953.thin_eed6a8.scrollerBase_eed6a8.fade_eed6a8.customTheme_eed6a8'
	commands = {
		play: '/modules/play.js',
		stop: '/modules/stop.js',
		start: '/modules/start.js',
	}
}
export default class ChannelConfig {
	localConfigs = {
		default: new UserConfig(),
	}
	local_path = {
		configUser: path.join(path_config, '/onBot/ConfigUsers.json'),
	}
	async load() {
		const checkPathConfigUser = await verifyJsonFile(this.local_path.configUser)
		if (checkPathConfigUser.status === false) {
			await writeJson(this.local_path.configUser, this.localConfigs)
		}
		this.localConfigs = await readJson(this.local_path.configUser)
	}
	async save() {
		await writeJson(this.local_path.configUser, this.localConfigs)
	}

	properties(name = 'default') {
		return this.localConfigs[name]
	}

	async new(nameConfig, configCallback) {
		this.localConfigs[nameConfig] = new UserConfig()
		await configCallback(this.localConfigs[nameConfig])
		await this.save()
	}
	async remove() {
		await deleteJson(this.local_path.configUser)
		await killDir(path.basename(this.local_path.configUser))
	}
}
