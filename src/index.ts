import puppeteer from "puppeteer";
import inquirer from "inquirer";

import path, { join } from "node:path";
import { readFile, writeFile, readdir } from "node:fs/promises";
import fs from "node:fs";

// Directorio para el perfil de usuario
const userDataDir = path.join(process.cwd(), "./user_data");
console.log("> userDataDir: ", userDataDir);

const pathToExtension = path.join(process.cwd(), "./AdblockPlus");
const args = [
	// '--start-maximized',
	`--disable-extensions-except=${pathToExtension}`,
	`--load-extension=${pathToExtension}`,
	"--no-sandbox",
	"--disable-setuid-sandbox",
];
let browser;
let pageMusic;
let page;
let configInit;
let urlConfigFile = "config_default.json";
let onReadyToStep = () => {};
async function showMenu() {
	console.clear();
	const filesConfig = await getConfigJsonFiles();
	const choices = [
		...filesConfig,
		"make new config",
		"remove config",
		"exit",
	];
	const answer = await inquirer.prompt([
		{
			type: "list",
			name: "config",
			message: "Seleccione un archivo de configuración:",
			choices: choices,
		},
	]);
	if (answer.config === "make new config") {
		console.clear();
		const responses = await inquirer.prompt([
			{
				type: "input",
				name: "nameConfig",
				message: "Config name:",
			},
			{
				type: "input",
				name: "channelURL",
				message: "Channel URL:",
			},
			{
				type: "input",
				name: "channelName",
				message: "Channel name:",
			},
			{
				type: "input",
				name: "botName",
				message: "Bot name:",
			},
			{
				type: "input",
				name: "tagBot",
				message: "Bot tag:",
			},
			{
				type: "input",
				name: "selectorScroll",
				message: "Selector scroll (optional):",
				default:
					".scroller_c43953.thin_eed6a8.scrollerBase_eed6a8.fade_eed6a8.customTheme_eed6a8",
			},
		]);

		const config = {
			channelURL: responses.channelURL,
			channelName: responses.channelName,
			botName: responses.botName,
			selectorScroll: responses.selectorScroll,
			tagBot: responses.tagBot,
		};
		await writeJson(
			`./configs/config_${responses.nameConfig}.json`,
			config,
		);
		urlConfigFile = `config_${responses.nameConfig}.json`;
		showMenu();
	} else if (answer.config === "remove config") {
		const choices = [...filesConfig, "exit"];
		const answer = await inquirer.prompt([
			{
				type: "list",
				name: "config",
				message: "Seleccione un archivo de configuración:",
				choices: choices,
			},
		]);
		if (answer.config === "exit") {
			console.clear();
			showMenu();
		} else {
			if (answer.config === "config_default.json") {
				console.clear();
				console.log("No se puede eliminar el archivo por defecto.");
				await new Promise((resolve) => setTimeout(resolve, 2000));
				showMenu();
				return;
			}
			const filePath = join(process.cwd(), answer.config);
			console.log(
				`Archivo ${answer.config} eliminado exitosamente.`,
				filePath,
			);
			fs.unlink(filePath, (err) => {
				if (err) {
					console.error(
						`Error al eliminar el archivo: ${err.message}`,
					);
					return;
				}
				console.log("Archivo eliminado exitosamente.");
			});
			showMenu();
		}
	} else if (answer.config === "exit") {
		console.clear();
		return;
	} else {
		urlConfigFile = answer.config;
		main();
	}
}

showMenu();
async function main() {
	configInit = await readJson(urlConfigFile);
	console.clear();
	console.log("> configInit: ", configInit);
	await new Promise((resolve) => setTimeout(resolve, 800));
	question();
	const { channelURL, channelName, selectorScroll, botName, tagBot } =
		configInit;

	console.clear();
	console.log("> starting: ", channelURL);

	// Lanza un navegador sin cabeza (headless)
	browser = await puppeteer.launch({
		headless: false, // Cambia a false para mostrar la ventana
		// devtools: true, // Abre DevTools al iniciar el navegador
		defaultViewport: null, // Opcional: permite que el navegador se abra con su tamaño por defecto
		userDataDir: userDataDir, // Ruta donde se guardará el caché y las sesiones
		args,
	});
	// Abre una nueva página
	pageMusic = await browser.newPage();
	await new Promise((resolve) => setTimeout(resolve, 1000));
	page = await browser.newPage();

	console.clear();
	console.log("> loading page discord and music\n>");

	const gotoMusic = async (url) => {
		pageMusic.bringToFront();
		await pageMusic.goto(url, {
			waitUntil: "networkidle0",
			timeout: 30000,
		});
		await new Promise((resolve) => setTimeout(resolve, 2000));
		page.bringToFront();
	};

	const controlsMusic = async (action, value = null) => {
		const controls = {
			pause: async () => {
				pageMusic.evaluate(() => {
					try {
						for (element of document.querySelectorAll("video")) {
							element.pause();
						}
					} catch (error) {}
				});
			},
			play: async () => {
				pageMusic.evaluate(() => {
					try {
						for (element of document.querySelectorAll("video")) {
							element.play();
						}
					} catch (error) {}
				});
			},
			volume: async (volume) => {
				pageMusic.evaluate((volume) => {
					try {
						for (element of document.querySelectorAll("video")) {
							element.volume = volume;
						}
					} catch (error) {}
				}, volume);
			},
		};
		await controls[action]?.(value);
	};

	await pageMusic.goto("about:blank");
	page.on("console", (msg) => {
		const intoText = msg.text();
		const tag = "[devMSG]";
		const tagClear = "[clear]";
		if (intoText.includes(tag)) {
			console.log(intoText.split(tag)[1]);
		} else if (intoText === tagClear) {
			console.clear();
		}
	});

	// Navega a una URL específica
	await page.goto(channelURL);
	await page.exposeFunction("readUsers", async () => {
		return await readUsers();
	});
	await page.exposeFunction("saveUsersToJson", async (into) => {
		return await saveUsersToJson(into);
	});
	await page.exposeFunction("gotoMusic", async (into) => {
		return await gotoMusic(into);
	});
	await page.exposeFunction("controlsMusic", async (into, value) => {
		return await controlsMusic(into, value);
	});
	await page.exposeFunction("pressChat", async () => {
		await pressChat();
		return true;
	});
	await page.exposeFunction("nextStep", async () => {
		onReadyToStep();
		return true;
	});

	console.clear();
	console.log("> Page loaded\n>");
	await new Promise((resolve) => setTimeout(resolve, 500));

	const selector = selectorScroll;
	await page.waitForSelector(selector);
	console.clear();
	console.log(">Starting...\n>");

	// Establecer el scroll hacia el fondo del div
	await page.evaluate(
		(selector, channelName, botName) => {
			function log(...args) {
				console.log("[devMSG]", ...args);
			}
			function clear() {
				console.log("[clear]");
			}
			clear();
			// log( ">Loading script for login channel\n>");
			script1();
			async function script1() {
				listUsers();
				async function listUsers() {
					// const channelName = "Tsure's Channel";
					// const selector = ".scroller_c43953.thin_eed6a8.scrollerBase_eed6a8.fade_eed6a8.customTheme_eed6a8";
					await new Promise((resolve) => setTimeout(resolve, 1000));
					try {
						console.log("Loading function list users");
						const lateralBar = document.querySelector(selector);
						if (lateralBar === null) {
							listUsers();
							return;
						}
						lateralBar.scrollTop = lateralBar.scrollHeight;
						await new Promise((resolve) =>
							setTimeout(resolve, 500),
						);
						const listChannels = lateralBar.querySelectorAll("li");
						if (listChannels.length === 0) {
							listUsers();
							return;
						}
						let channelUser = [];
						for (const channel of listChannels) {
							const dndName =
								channel.getAttribute("data-dnd-name");
							if (dndName === channelName) {
								channelUser.push(channel);
							}
						}
						if (channelUser.length === 0) {
							listUsers();
							return;
						}
						channelUser = channelUser[0];
						console.log("Channel found, ", channelUser);
						selectChannel(channelUser);
						return;
					} catch (error) {
						console.log("Error: ", error.message);
						listUsers();
					}
				}

				async function selectChannel(elementChanelUser) {
					await new Promise((resolve) => setTimeout(resolve, 1000));
					try {
						await new Promise((resolve) =>
							setTimeout(resolve, 1000),
						);
						const parentDivChannel =
							elementChanelUser.querySelectorAll("div")[0];
						if (parentDivChannel === null) {
							selectChannel(elementChanelUser);
							return;
						}
						const intoChannelButton =
							parentDivChannel.querySelectorAll("a")[0];
						if (intoChannelButton === null) {
							selectChannel(elementChanelUser);
							return;
						}
						intoChannelButton.click();
						entryChannel();
					} catch (error) {
						selectChannel(elementChanelUser);
					}
				}

				async function entryChannel() {
					await new Promise((resolve) => setTimeout(resolve, 1000));
					try {
						const identifierUserTag = botName;
						const identifierElement =
							document.querySelectorAll("div");
						let onElementUser = null;
						for (const idUser of identifierElement) {
							const elementText = idUser.innerHTML;
							if (elementText === identifierUserTag) {
								onElementUser = idUser;
							}
						}
						if (onElementUser === null) {
							entryChannel();
							return;
						}
						const topLevel =
							onElementUser.parentNode.parentNode.parentNode
								.parentNode.parentNode;
						const onSelectActionDiv = topLevel
							.querySelectorAll("div")[0]
							.querySelectorAll("div")[0]
							.querySelectorAll("div")[0];
						const selectorChannel =
							onSelectActionDiv.querySelectorAll("a")[0];
						selectorChannel.click();
						await new Promise((resolve) =>
							setTimeout(resolve, 500),
						);
						await window.pressChat();
						await new Promise((resolve) =>
							setTimeout(resolve, 500),
						);
						await window.nextStep();
					} catch (error) {
						entryChannel();
					}
				}
			}
		},
		selector,
		channelName,
		botName,
	);

	console.clear();
	console.log("--------> waiting for page...\n>");
	await new Promise((resolve) => {
		onReadyToStep = resolve;
	});

	// Simular la combinación de teclas Ctrl + U
	async function pressChat() {
		await page.keyboard.down("Control"); // Presionar la tecla Control
		await page.keyboard.press("KeyU"); // Presionar la tecla U
		await page.keyboard.up("Control"); // Soltar la tecla Control
		return true;
	}

	console.clear();
	console.log("--------> loading chat\n>");

	await page.evaluate((tagBotIn) => {
		main();
		async function main() {
			let onCommand = "";
			await new Promise((resolve) => setTimeout(resolve, 1000));
			onChat();
			async function onChat() {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				let onElement = false;
				for (element of document.querySelectorAll("div")) {
					const clases = element.classList;
					const clasesString = Array.from(clases).join(" ");
					if (clasesString.includes("chatLayerWrapper_")) {
						onElement = true;
					}
				}
				if (!onElement) {
					onChat();
					return;
				}
				listenChat();
			}

			async function listenChat() {
				await new Promise((resolve) => setTimeout(resolve, 2000));
				const onElement = [];
				let users = {};
				let cachedUser = "";
				for (element of document.querySelectorAll("li")) {
					const elementoText = element.innerText
						.replaceAll("[", "")
						.replaceAll("]", "");
					let splitComentario = elementoText.split("\n");
					if (splitComentario.length > 1) {
						if (elementoText.includes(" — ")) {
							cachedUser = splitComentario[0];
							users[cachedUser] = "";
						} else if (cachedUser !== "") {
							splitComentario = [cachedUser, ...splitComentario];
						}
						splitComentario = splitComentario.filter((element) => {
							return element !== "" && element !== " — ";
						});
						onElement.push(splitComentario);
					}
				}
				users = Object.keys(users);
				onElement.shift();
				await window.saveUsersToJson(JSON.stringify(users));
				const ultimoComentario = onElement.pop();
				const tagBot = `${tagBotIn} `;
				const usersAdmin = await window.readUsers();
				const conditions = async (comentario) => {
					try {
						const userName = comentario.shift();
						const timeMessage = comentario.shift();
						const message = comentario.shift();
						if (!usersAdmin.includes(userName)) return;
						if (message.slice(0, tagBot.length) !== tagBot) return;
						const command = message.slice(tagBot.length);
						if (command === onCommand) return;
						onCommand = command;
						await actionCommand(command, timeMessage);
					} catch (error) {
						console.log("-------->", "error: ", comentario);
					}
				};
				await conditions(ultimoComentario);
				listenChat();
			}

			async function filter() {}

			async function actionCommand(command) {
				console.log(command);
				const commands = {
					play: async (url) => {
						if (!url) {
							window.controlsMusic("play", null);
							return;
						}
						if (!url.includes("https://")) return;
						await gotoMusic(url);
					},
					pause: () => {
						window.controlsMusic("pause", null);
					},
					volume: (volume = null) => {
						// chekar esto
						// if (volume === null) return;
						// const volumeInto = parseFloat(volume);
						// if (isNaN(volumeInto)) return;
						// window.controlsMusic("volume", volumeInto);
					},
					clear: async () => {
						await gotoMusic("about:blank");
					},
				};
				const commandInto = command.split(" ");
				await commands[commandInto[0]]?.(
					commandInto.length > 1 ? commandInto[1] : null,
				);
			}
		}
	}, tagBot);
}

async function readJson(fileName) {
	try {
		const filePath = join(process.cwd(), fileName);
		const jsonData = await readFile(filePath, "utf8");
		const data = JSON.parse(jsonData);
		return data;
	} catch (error) {
		console.error(`Error reading ${fileName} file:`, error.message);
		throw error;
	}
}

async function writeJson(fileName, data) {
	const filePath = join(process.cwd(), fileName);
	await writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
	return true;
}

async function readUsers() {
	try {
		// Get the absolute path to the JSON file
		const filePath = join(process.cwd(), "./configs/users.json");

		// Read and parse the JSON file
		const jsonData = await readFile(filePath, "utf8");
		const users = JSON.parse(jsonData);

		return users;
	} catch (error) {
		console.error("Error reading users file:", error.message);
		throw error;
	}
}

let saveUsersToJsonCache = "";

// TODO: refactor this function
async function saveUsersToJson(newUsers, url = "./logs/logUsers.json") {
	if (saveUsersToJsonCache !== newUsers && url === "./logs/logUsers.json") {
		saveUsersToJsonCache = newUsers;
		console.clear();
		console.log("\n\n--> users on chat: ", JSON.parse(newUsers));
	}
	const filePath = join(process.cwd(), url);
	await writeFile(filePath, newUsers, "utf8");
	return true;
}

async function question() {
	const answer = await inquirer.prompt([
		{
			type: "input",
			name: "response",
			message: ">",
		},
	]);

	const respuesta = answer.response;
	// TODO: refactor this (change else if to switch) or (a list key value)
	if (respuesta === "") {
		console.clear();
		console.log("--------> closing app");
		try {
			if (!page.isClosed()) {
				await page.close();
			}
			await new Promise((resolve) => setTimeout(resolve, 1000));
			if (!pageMusic.isClosed()) {
				await pageMusic.close();
			}
			await new Promise((resolve) => setTimeout(resolve, 1000));
			if (browser) {
				await browser.close();
			}
			console.log("--------> browser closed");
			await new Promise((resolve) => setTimeout(resolve, 500));
			console.clear();
		} catch (error) {}
		console.log("--------> app closed");

		return;

		// biome-ignore lint/style/noUselessElse: <explanation>
	} else if (respuesta.includes("add")) {
		const newUser = respuesta.split(" ")[1];
		let onUsers = await readUsers();
		const obj = onUsers.reduce((acc, key) => {
			acc[key] = "";
			return acc;
		}, {});
		obj[newUser] = "";
		onUsers = Object.keys(obj);
		console.clear();
		console.log(`Okay adding ${newUser}------->`, onUsers);
		await saveUsersToJson(JSON.stringify(onUsers), "./configs/users.json");
		await new Promise((resolve) => setTimeout(resolve, 800));
		console.clear();
		saveUsersToJsonCache = "";
		question();
		return;
		// biome-ignore lint/style/noUselessElse: <explanation>
	} else if (respuesta.includes("remove")) {
		const newUser = respuesta.split(" ")[1];
		let onUsers = await readUsers();
		const obj = onUsers.reduce((acc, key) => {
			acc[key] = "";
			return acc;
		}, {});
		delete obj[newUser];
		onUsers = Object.keys(obj);
		console.clear();
		console.log(`Okay removing ${newUser}------->`, onUsers);
		await saveUsersToJson(JSON.stringify(onUsers), "users.json");
		await new Promise((resolve) => setTimeout(resolve, 800));
		console.clear();
		saveUsersToJsonCache = "";
		question();
		return;
		// biome-ignore lint/style/noUselessElse: <explanation>
	} else if (respuesta.includes("list")) {
		const onUsers = await readUsers();
		console.log("Okay listing users------->", onUsers);
		await new Promise((resolve) => setTimeout(resolve, 20000));
		console.clear();
		saveUsersToJsonCache = "";
		question();
		return;
	}
	console.clear();
	saveUsersToJsonCache = "";
	question();
}

async function getConfigJsonFiles() {
	try {
		const directoryPath = path.join(process.cwd(), "./src/configs");
		const files = await readdir(directoryPath);
		const configJsonFiles = files.filter(
			(file) => file.endsWith(".json") && file.includes("config"),
		);
		return configJsonFiles;
	} catch (error) {
		console.error("Error reading directory:", error.message);
		throw error;
	}
}
