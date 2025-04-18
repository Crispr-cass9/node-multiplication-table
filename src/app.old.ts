import fs from 'fs';
import { yarg } from './config/plugins/args.plugin';

const { b:base, l:limit , s:show } = yarg
const separator:string = '='.repeat(60)
const message:string = `\r\nTabla del ${base}\r\n`
let text = separator + message + separator + '\r\n\r\n'



for (let index = 1; index <= limit; index++) {
    text = text + `${base} x ${index} = ${base*index}\r\n`
}

const outputPath = `outputs/data`


if (show) console.log('\r\n'+text);

fs.mkdirSync(outputPath, {recursive:true})
fs.writeFile(`${outputPath}/tabla-${base}.txt`, text, (err) => {
    if (err) throw err
    console.log('Datos añadidos');
    
})

