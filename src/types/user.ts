import type { Config } from "./config";

enum Os {
	linux = "linux",
	darwin = "darwin",
	windows = "win32",
}

interface User {
	// TODO: add more properties if needed
	os: Os;
	config: Config;
}
