import { test, expect } from "bun:test";
import readJson from "../utils/readJson";

test("client.ts",  async() => {
    const retorno = await readJson("./test.json");
    expect(retorno).toEqual({ "name": "test" });
	
});
