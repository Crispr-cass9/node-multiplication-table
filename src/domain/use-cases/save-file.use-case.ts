import { error } from 'console';
import fs from 'fs'

export interface SaveFilesUseCase{
    execute: ( options: SaveFileOptions ) => boolean;
}

export interface SaveFileOptions{
    fileContent: string;
    fileDestination?: string;
    fileName?: string;
}

export class SaveFile implements SaveFilesUseCase{

    constructor(){}

    execute({fileContent, fileDestination='./outputs/data', fileName='table'}:SaveFileOptions): boolean{

        try{

            fs.mkdirSync(fileDestination, {recursive:true})
            fs.writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent)
            return true
        }
        catch (error){
            // console.error(error); Esto debería realizarlo con un logger para que no moleste en el testing
            return false
        }
    }
}