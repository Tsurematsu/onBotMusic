import startup from '@/cli/startup'
async function main() {
	console.log('<start>')
	await startup({
		console_log: console.log,
		trowError: console.error,
	})
}
main()
