import xdg from '@folder/xdg'
import { promises as fs } from 'node:fs'

const dir = xdg()

const path_cache = dir.cache
const path_state = dir.state
const path_config = dir.config
const path_config_dirs = dir.config_dirs
const path_data = dir.data
const path_data_dirs = dir.data_dirs
const path_users = dir.data
const path_runtime = dir.runtime
const path_logs = dir.logs

const objectExports = {
	path_cache,
	path_config,
	path_config_dirs,
	path_data,
	path_data_dirs,
	path_logs,
	path_runtime,
	path_state,
	path_users,
}
export default objectExports
export {
	path_cache,
	path_config,
	path_config_dirs,
	path_data,
	path_data_dirs,
	path_logs,
	path_runtime,
	path_state,
	path_users,
}

export async function kDir(dirPath: string) {
	await fs.mkdir(dirPath, { recursive: true })
}
