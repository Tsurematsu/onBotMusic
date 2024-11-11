import { logNav, logNav_clear, tag } from '@/utils/log'
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default function handleConsole(page: any, tagPage: string) {
	page.on('console', (msg) => {
		const intoText = msg.text()
		const tagClear = '[clear]'
		if (intoText.includes(tag)) {
			const msg = intoText.replace(tag, '')
			logNav(`[${tagPage}]`, msg)
		}
		if (intoText === tagClear) {
			logNav_clear()
		}
		if (msg.type() === 'error' && msg.location === undefined) {
			logNav(`[${tagPage}]`, intoText)
		}
	})
}
