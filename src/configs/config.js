import { readJson, writeJson } from "../utils/json.js";
import listFiles from "../utils/listFiles.js";
import Path from "@/config/config";
/**
 * @typedef {Object} ConfigData
 * @property {string} nameChannel - The name of the configuration.
 * @property {string} urlChannel - The URL associated with the configuration.
 * @property {string} userName - The URL associated with the configuration.
 * @property {string} scrollID - The token used for authentication.
 */

/**
 * Configuration class for managing Discord channel configurations.
 */
export default new (class Config {
	path_config = Path.getConfig();
	/**
	 * Configuration class for Discord channel.
	 */
	channelDiscord = new (class {
		/**
		 * Path to the default configuration file.
		 * @type {string}
		 */
		patchFile = "./temp/config_default.json";

		/**
		 * Selects a new configuration file.
		 * @param {string} patchFile - The path to the new configuration file.
		 */
		selectConfigFile(patchFile) {
			this.patchFile = patchFile;
		}

		/**
		 * Retrieves the current configuration.
		 * @returns {ConfigData} The configuration data.
		 */
		get() {
			return readJson(this.patchFile);
		}

		/**
		 * Sets the configuration data.
		 * @param {ConfigData} data - The configuration data to write.
		 */
		set(data) {
			writeJson(this.patchFile, data);
		}

		/**
		 * Creates a new configuration file with the given data and name.
		 * @param {ConfigData} data - The configuration data to write.
		 * @param {string} name - The name of the new configuration file.
		 */
		makeConfig(data, name) {
			const newPatchFile = `./temp/${name + name.includes(".json") ? "" : ".json"}`;
			writeJson(newPatchFile, data);
		}

		getConfigs() {
			return listFiles("./temp");
		}
	})();

	browserParams = new (class {
		patchFile = "./config/browser_params.json";
		selectConfigFile(patchFile) {
			this.patchFile = patchFile;
		}
		get() {
			return readJson(this.patchFile);
		}
		set(data) {
			writeJson(this.patchFile, data);
		}
	})();
})();
