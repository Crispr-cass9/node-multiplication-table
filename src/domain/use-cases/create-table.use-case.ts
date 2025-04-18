export interface CreateTableUseCase {
    execute: ( options: CreateTableOptions) => string;
}

export interface CreateTableOptions { 
    base: number;
    limit?: number;
}

export class CreateTable implements CreateTableUseCase{
    constructor(){
        // Aquí irían las inyecciones de dependencias en caso de tenerlas
    }


    execute({ base, limit = 10 }: CreateTableOptions){
        let table='';
        
        for (let index = 1; index <= limit; index++) {
            table = table + `${base} x ${index} = ${base*index}\r\n`
        }

        return table;
    }
}