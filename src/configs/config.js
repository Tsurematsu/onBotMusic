import path from "path";
import readJson from "../utils/readJson.js";
import writeJson from "../utils/writeJson.js";
export default new class Config {
    constructor(){
        console.log("hello from config");
        readJson("./config_default.json").then((data) => {
            console.log(data);
        });

        writeJson("./hola.json", {name: "hello"});
    }
}