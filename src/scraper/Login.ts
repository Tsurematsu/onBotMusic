import { tag } from '@/utils/log'
import dotenv from 'dotenv'
import path from 'node:path'
dotenv.config()
export default class Login {
	async entry(page) {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const { WaitElement, window } = Object as any
		const email = process.env.email || ''
		const password = process.env.password || ''
		await page.addScriptTag({
			path: path.resolve(__dirname, './modulesBrowser/waitElement.js'),
		})

		await page.evaluate(async (tag) => {
			login()
			async function login() {
				console.log(tag, 'Login init')
				let count = 0
				const emailButton = new WaitElement(
					() => {
						count++
						console.log(tag, 'emailButton.exist ->', count)
						return count > 10
					},
					1000,
					tag,
				)
				await emailButton.exist(async (element) => {
					console.log('okay elemento encontrado')
				})
			}
		}, tag)

		// await page.waitForSelector('#email')

		// await new Promise((r) => setTimeout(r, 1000))
		// console.log(tag, 'emailButton.exist ->', element)
		// element.focus()
		// await window.write('email')

		// section:-------------------

		// await system.page.discord.goto('https://discord.com/login')

		// await system.page.discord.evaluate((tag) => {}, tag)
		// const window = {
		// 	write: (a) => {},
		// 	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		// 	waitElement: async (a: any, b: any, c: any, d: any, f: any) => {
		// 		return {}
		// 	},
		// }
		// await waitElement(system.page.discord)
		// await system.page.discord.evaluate(
		// 	(tag, credencial) => {
		// 		const { waitElement, write } = window
		// 		console.log(tag, 'Login init')
		// 		Login()
		// 		async function Login() {
		// 			const statusFinish = false
		// 			const listResolve = []
		// 			const geterrInput = (name) => {
		// 				return
		// 			}
		// 			const onFinish = async (element, name) => {
		// 				element.focus()
		// 				await write(credencial[name])
		// 			}

		// 			const resolveH1 = (resolve) => {
		// 				console.log(tag, 'geterrInput', name, resolve)
		// 				listResolve.push(resolve)
		// 			}

		// 			async function gaterElement(
		// 				name,
		// 				defaultFunction = geterrInput,
		// 				DonFinish = onFinish,
		// 			) {
		// 				if (statusFinish) return
		// 				return (await waitElement(
		// 					defaultFunction,
		// 					name,
		// 					300,
		// 					DonFinish,
		// 					resolveH1,
		// 				)) as HTMLInputElement
		// 			}

		// 			const getElementH1 = () => {
		// 				const elementH1 = document.querySelectorAll('h1')
		// 				for (const element of Object.values(elementH1)) {
		// 					if (element.innerText === 'Amigos') {
		// 						return element
		// 					}
		// 				}
		// 				return undefined
		// 			}

		// 			const onFinishH1 = () => {
		// 				for (const resolve of listResolve) {
		// 					resolve()
		// 				}
		// 				console.log(tag, 'Finish waitElement')
		// 			}

		// 			waitElement(getElementH1, null, 3000, onFinishH1, null)
		// 			await gaterElement('email')
		// 			await gaterElement('password')

		// 			const loginButton = document.querySelector(
		// 				'button[type="submit"]',
		// 			) as HTMLButtonElement
		// 			if (loginButton !== null) {
		// 				loginButton.click()
		// 			}
		// 			console.log(tag, 'Login finish')
		// 		}
		// 	},
		// 	tag,
		// 	{ email, password },
		// )
	}
}
