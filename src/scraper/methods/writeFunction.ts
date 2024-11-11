// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default async function writeFunction(page: any) {
	await page.exposeFunction('write', async (keyCommands) => {
		if (Array.isArray(keyCommands)) {
			for (const keyCommand of keyCommands) {
				const type = Object.keys(keyCommand)[0]
				const value = keyCommand[type]
				if (type === 'sleep') {
					await new Promise((resolve) => setTimeout(resolve, value))
					continue
				}
				await page.keyboard[type](value)
			}
		}
		if (typeof keyCommands === 'string') {
			await page.keyboard.type(keyCommands)
		}
	})
}
