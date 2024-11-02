// Importa Puppeteer utilizando sintaxis ES6
import puppeteer from 'puppeteer';
import path from 'path';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import readline from 'readline';

// Crear una interfaz para leer desde la consola
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Directorio para el perfil de usuario
const userDataDir = path.join(process.cwd(), 'user_data');
const pathToExtension = path.join(process.cwd(), './Adblock-Plus-bloqueador-de-anuncios-gratis-Chrome-Web-Store');
const args = [
    // '--start-maximized',
    `--disable-extensions-except=${pathToExtension}`,
    `--load-extension=${pathToExtension}`,
    '--no-sandbox',
    '--disable-setuid-sandbox',
    // '--window-position=2000,0'
];
console.log("-------->", args);


let browser;
let pageMusic;
let page;
main()
async function main() {
    // Lanza un navegador sin cabeza (headless)
    browser = await puppeteer.launch({
        headless: false, // Cambia a false para mostrar la ventana
        // devtools: true, // Abre DevTools al iniciar el navegador
        defaultViewport: null, // Opcional: permite que el navegador se abra con su tamaño por defecto
        userDataDir: userDataDir, // Ruta donde se guardará el caché y las sesiones
        args
    });
    // Abre una nueva página
    pageMusic = await browser.newPage();
    await new Promise(resolve => setTimeout(resolve, 1000));
    page = await browser.newPage();
    const gotoMusic = async (url) => {
        pageMusic.bringToFront();
        await pageMusic.goto(url, {
            waitUntil: 'networkidle0',
            timeout: 30000
        });
        await new Promise(resolve => setTimeout(resolve, 2000));
        page.bringToFront();
    };
    const controlsMusic = async (action, value = null) => {
        const controls = {
            pause: async () => {
                pageMusic.evaluate(() => {
                    try {
                        for (element of document.querySelectorAll('video')) {
                            element.pause();
                        }
                    } catch (error) { }
                });
            },
            play: async () => {
                pageMusic.evaluate(() => {
                    try {
                        for (element of document.querySelectorAll('video')) {
                            element.play();
                        }
                    } catch (error) { }

                });
            },
            volume: async (volume) => {
                pageMusic.evaluate((volume) => {
                    try {
                        for (element of document.querySelectorAll('video')) {
                            element.volume = volume;
                        }
                    } catch (error) { }
                }, volume);
            },
        }
        await controls[action]?.(value);
    }
    await pageMusic.goto('about:blank');
    page.on('console', msg => {
        const intoText = msg.text();
        if (intoText.includes('[devMSG]')) {
            console.log(intoText);
        }
    });

    // Navega a una URL específica
    await page.goto('https://discord.com/channels/768278151435386900/845314420494434355');
    await page.exposeFunction('readUsers', async () => {
        return await readUsers();
    });
    await page.exposeFunction('saveUsersToJson', async (into) => {
        return await saveUsersToJson(into);
    });
    await page.exposeFunction('gotoMusic', async (into) => {
        return await gotoMusic(into);
    });
    await page.exposeFunction('controlsMusic', async (into, value) => {
        return await controlsMusic(into, value);
    });

    const selector = '.scroller_c43953.thin_eed6a8.scrollerBase_eed6a8.fade_eed6a8.customTheme_eed6a8';
    await page.waitForSelector(selector);
    console.log("--------> selector: ", selector);
    
    // Establecer el scroll hacia el fondo del div
    await page.evaluate((selector) => {
        console.log("--------> script1");
        script1();
        async function script1() {
            const element = document.querySelector(selector);
            if (element) {
                element.scrollTop = element.scrollHeight;
                await new Promise(resolve => setTimeout(resolve, 1000));
                const elements = document.querySelectorAll("li");
                for (const element of elements) {
                    const dndName = element.getAttribute('data-dnd-name');
                    if (dndName === "Tsure's Channel") {
                        const onDiv = element.querySelectorAll("div")[0];
                        const aButton = onDiv.querySelectorAll("a")[0];
                        aButton.click();
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        const parentChannel = document.querySelectorAll(".inner_adcaac")[0].querySelectorAll("div")[0];
                        const aChannel = parentChannel.querySelectorAll("a")[0];
                        aChannel.click();
                    }
                }
            }
        }
    }, selector);

    await new Promise(resolve => setTimeout(resolve, 7000));
    
    // Simular la combinación de teclas Ctrl + U
    await page.keyboard.down('Control');  // Presionar la tecla Control
    await page.keyboard.press('KeyU');    // Presionar la tecla U
    await page.keyboard.up('Control');    // Soltar la tecla Control

    console.log("--------> loading");
    
    await page.evaluate(() => {
        main();
        async function main() {
            let onCommand = "";
            await new Promise(resolve => setTimeout(resolve, 5000));
            onChat();
            async function onChat() {
                await new Promise(resolve => setTimeout(resolve, 5000));
                let onElement = false;
                for (element of document.querySelectorAll('div')) {
                    const clases = element.classList;
                    const clasesString = Array.from(clases).join(' ');
                    if (clasesString.includes("chatLayerWrapper_")) {
                        onElement = true;
                    }

                }
                if (!onElement) { onChat(); return; }
                listenChat();
            }

            async function listenChat() {
                await new Promise(resolve => setTimeout(resolve, 2000));
                let onElement = [];
                let users = {};
                let cachedUser = "";
                for (element of document.querySelectorAll('li')) {
                    const elementoText = element.innerText.replaceAll("[", "").replaceAll("]", "");
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
                const tagBot = "-bot "
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
            async function actionCommand(command) {
                console.log(command);
                const commands = {
                    "play": async (url) => {
                        if (!url) {
                            window.controlsMusic("play", null);
                            return;
                        };
                        if (!url.includes("https://")) return;
                        await gotoMusic(url);
                    },
                    "pause": () => {
                        window.controlsMusic("pause", null);
                    },
                    "volume": (volume = null) => {
                        if (volume === null) return;
                        const volumeInto = parseFloat(volume);
                        if (isNaN(volumeInto)) return;
                        window.controlsMusic("volume", volumeInto);
                    },
                    "clear": async () => {
                        await gotoMusic("about:blank");
                    }
                }
                const commandInto = command.split(" ");
                await commands[commandInto[0]]?.(commandInto.length > 1 ? commandInto[1] : null);
            }
        }
    });

}

async function readUsers() {
    try {
        // Get the absolute path to the JSON file
        const filePath = join(process.cwd(), 'users.json');

        // Read and parse the JSON file
        const jsonData = await readFile(filePath, 'utf8');
        const users = JSON.parse(jsonData);

        return users;
    } catch (error) {
        console.error('Error reading users file:', error.message);
        throw error;
    }
};


async function saveUsersToJson(newUsers) {
    const filePath = join(process.cwd(), 'logUsers.json');
    await writeFile(
        filePath,
        newUsers,
        'utf8'
    );
    return true;
};

rl.question('enter to exit', async (respuesta) => {
    if (!page.isClosed()) { await page.close(); }
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (!pageMusic.isClosed()) { await pageMusic.close(); }
    await new Promise(resolve => setTimeout(resolve, 1000));
    await browser.close();
    rl.close();
});