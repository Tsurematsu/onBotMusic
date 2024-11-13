import type { Page } from 'puppeteer'
import Actions from './Actions'

export default async function open(
	page: Page,
	callback: (actions: Actions) => void,
) {
	const actions = new Actions(page)
	callback(actions)
}
