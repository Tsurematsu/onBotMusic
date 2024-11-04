import { test, expect } from "bun:test";
import { readJson } from "../utils/json";
test("client.ts",  async() => {
    const retorno = await readJson("./test.json");
    expect(retorno).toEqual({ "name": "test" });
	
});
