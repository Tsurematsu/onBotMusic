# Proyecto de Automatización con Puppeteer

Este proyecto utiliza Puppeteer para automatizar la interacción con un canal de Discord y controlar la reproducción de música en una página web.

## Requisitos

- Node.js
- npm

## Instalación

1. Clona este repositorio:
    ```sh
    git clone <URL_DEL_REPOSITORIO>
    ```
2. Navega al directorio del proyecto:
    ```sh
    cd <NOMBRE_DEL_DIRECTORIO>
    ```
3. Instala las dependencias:
    ```sh
    npm install
    ```

## Configuración

1. Crea un archivo de configuración JSON en el directorio `src/configs/` con el siguiente formato:
    ```json
    {
        "channelURL": "https://discord.com/channels/768278151435386900/845314420494434355",
        "channelName": "Tsure's Channel",
        "selectorScroll": ".scroller_c43953.thin_eed6a8.scrollerBase_eed6a8.fade_eed6a8.customTheme_eed6a8",
        "botName": "Tsure bot",
        "tagBot": "-bot"
    }
    ```
2. Asegúrate de que el archivo de configuración tenga un nombre único, por ejemplo, `config_default.json`.

## Uso

1. Ejecuta el script principal:
    ```sh
    npm start
    ```
2. Sigue las instrucciones en la consola para seleccionar o crear una configuración.

## Estructura del Proyecto

- `src/`
  - `AdblockPlus/`: Contiene archivos relacionados con la extensión Adblock Plus.
  - `configs/`: Contiene archivos de configuración JSON.
  - `index.js`: Script principal que inicia la automatización.
  - `logs/`: Directorio para almacenar logs.
  - `user_data/`: Directorio para almacenar datos de usuario.

## Funciones Principales

- `showMenu()`: Muestra el menú de configuración.
- `main()`: Función principal que inicia la automatización.
- `readJson(fileName)`: Lee un archivo JSON.
- `writeJson(fileName, data)`: Escribe datos en un archivo JSON.
- `readUsers()`: Lee la lista de usuarios.
- `saveUsersToJson(newUsers, url)`: Guarda la lista de usuarios en un archivo JSON.
- `question()`: Maneja las preguntas de la consola.
- `getConfigJsonFiles()`: Obtiene los archivos de configuración JSON disponibles.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir cualquier cambio que te gustaría hacer.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.