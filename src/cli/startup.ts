// import {deleteJson, readJson, writeJson} from "./utils/json";
import config from '@/configs/config'
export default async function startup({ console_log, trowError }) {
	await config.browser.load()
	console.log(config.browser.local_path)
	// console.log(config.browser.properties())
	// config.browser.defaultViewport = null
	// console.log(config.browser.properties())
	// await config.browser.save()

	// const browser = await puppeteer.launch({
	// 	headless: false, // Cambia a false para mostrar la ventana
	// 	// devtools: true, // Abre DevTools al iniciar el navegador
	// 	defaultViewport: null, // Opcional: permite que el navegador se abra con su tamaño por defecto
	// 	userDataDir: userDataDir, // Ruta donde se guardará el caché y las sesiones
	// 	[
	// 		// '--start-maximized',
	// 		`--disable-extensions-except=${pathToExtension}`,
	// 		`--load-extension=${pathToExtension}`,
	// 		'--no-sandbox',
	// 		'--disable-setuid-sandbox',
	// 	],
	// })

	// await writeJson("./configs/temp/hola.json", {hola: "mundo"});
	// console.log(await readJson("./configs/temp/hola.json"));
	// await deleteJson("./configs/temp/hola.json");
	// await deleteJson("./configs/temp/hola.json");
	// console.log(await listFiles("./configs/temp"));

	// because the browser class is not implemented, we will return false and process is in development
	return false
}
