```ts
import path from 'node:path'
export default async function waitElement(page) {
	await page.addScriptTag({
		path: path.resolve(__dirname, './waitElementClient.js'),
	})
}
```