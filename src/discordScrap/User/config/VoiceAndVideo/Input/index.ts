import type { Page } from 'puppeteer'
import selectOption from '../../modules/selectOption'
import getInputs from './modules/getInputs'
import getSelected from './modules/getSelected'
import openInput from './modules/openInput'
interface Device {
	name: string
	data_list_item_id: string
}

interface CacheDevices {
	Devices: Device[]
	default: string
	name: string[]
}
export default class Input {
	private page: Page
	private listDevices: Device[] = []
	cacheDevices: CacheDevices = {
		Devices: [],
		default: null,
		name: [],
	}

	constructor(page: Page) {
		this.page = page
	}

	async getSelected() {
		return await getSelected(this.page)
	}

	async getDevices(unfocus = true) {
		await selectOption(this.page, 'Voz y vídeo')
		await openInput(this.page)
		this.listDevices = await getInputs(this.page)
		if (unfocus) await this.page.click('body')
		this.cacheDevices = {
			Devices: this.listDevices,
			default: this.listDevices.filter((element) =>
				element.data_list_item_id.includes('__default'),
			)[0].name,
			name: this.listDevices.map((element) => element.name),
		}
		return this.cacheDevices
	}
	async setDevice(device: string | Device) {
		await new Promise((resolve) => setTimeout(resolve, 200))
		await this.getDevices(false)
		let data_list_item_id: string
		if (typeof device === 'string') {
			for (const element of this.listDevices) {
				if (element.name.includes(device)) {
					data_list_item_id = element.data_list_item_id
					break
				}
			}
		} else {
			data_list_item_id = device.data_list_item_id
		}
		try {
			await this.page.click(`div[data-list-item-id="${data_list_item_id}"]`)
			await new Promise((resolve) => setTimeout(resolve, 500))
		} catch (error) {
			console.log('error', error, data_list_item_id)
		}
	}
}
