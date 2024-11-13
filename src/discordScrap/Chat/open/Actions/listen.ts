import type { Page } from 'puppeteer'

export default async function listen(
	page: Page,
	callback: (message: string) => void,
) {
	console.log('listen')
}
