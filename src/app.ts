import { log } from "console";
import { yarg } from "./config/plugins/args.plugin";
import { ServerApp } from "./presentation/server-app";

(async () => {
    await main();
})()

async function main() {

    // Ahora mi dependencia de Yarg sólo está en este archivo y no en donde manejaré toda la lógica del programa
    const {b:base, l:limit, s:showTable, n: name, d:destination} = yarg
    

    ServerApp.run({base, limit, showTable, name, destination})



}