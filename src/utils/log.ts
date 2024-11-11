const tag = '[onBot]'
const logNav = (...args: unknown[]) => log('navigator ->', ...args)
const logNav_clear = () => console.clear()
export default function log(...args: unknown[]) {
	console.log(...args)
}
export { logNav, logNav_clear, tag }
