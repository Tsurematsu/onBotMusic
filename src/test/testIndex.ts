// import {deleteJson, readJson, writeJson} from "./utils/json";
import startup from '@/cli/startup'
import config from '@/configs/config'
async function main() {
	console.log('<start>')
	await startup()
	config.getBrowserArgs()
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
}
main()
