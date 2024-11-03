import { test, expect } from "bun:test";
import Client from "../users/client";

test("client.ts", () => {
	const client = new Client();
	//NOTE: if you want to test the getOs() method, you need to add a test case for each os
	// windows test
	expect(client.getOs()).toBe("win32");
	// darwin test
	// expect(client.getOs()).toBe("darwin");
	// linux test
	// expect(client.getOs()).toBe("linux");
});
