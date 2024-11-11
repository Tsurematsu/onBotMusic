// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const window = { waitElement: async (a: any, b: any, c: any, d: any) => {} }
export default async function waitElement(
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	page: any,
	op1: unknown = Object,
	op2: unknown = Object,
	op3: unknown = Object,
) {
	await page.evaluate(() => {
		window.waitElement = async (
			getElement,
			params,
			interval,
			onfinish = (e) => {},
			init = (c) => {},
		) => {
			return await new Promise((resolve) => {
				init(() => {
					resolve()
					return
				})
				onElement(params)
				async function onElement(params) {
					try {
						const input = getElement(params)
						if (input === undefined || input === null) {
							await new Promise((resolve) => setTimeout(resolve, interval))
							onElement(params)
							return
						}
						await new Promise((resolve) => setTimeout(resolve, interval))
						await onfinish(input, params)
						resolve(input)
					} catch (error) {
						await new Promise((resolve) => setTimeout(resolve, interval))
						onElement(params)
					}
				}
			})
		}
	})
	return {}
}
