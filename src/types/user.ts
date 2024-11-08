import type { Config } from './config'

// TODO: add more properties if needed - Os support
export type Os = 'linux' | 'darwin' | 'win32'

export interface User {
	// TODO: add more properties if needed
	os: Os
	config: Config
	// NOTE: Methods
	// setup(): void;
}
