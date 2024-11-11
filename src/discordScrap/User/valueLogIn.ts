export default async function valueLogIn(page, time) {
	await new Promise((resolve) => setTimeout(resolve, time))
	return await page.url().includes('channels/@me')
}
