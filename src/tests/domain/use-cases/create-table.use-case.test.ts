import { create } from 'domain'
import { CreateTable } from '../../../domain/use-cases/create-table.use-case'

describe('domain/use-cases/create-table.use-case.ts', () => {

    test('Should create table with default values', () => {

        const createTable = new CreateTable()
        const table = createTable.execute({ base: 7 })
        const rows = table.split('\n')
        
        expect( createTable ).toBeInstanceOf(CreateTable)
        expect( table ).toContain('7 x 1 = 7')
        expect( table ).toContain('7 x 10 = 70')
        expect ( rows.length ).toBe(11)
    })

    test('Should create a table with custo values', () =>{
        const options = {
            base: 3,
            limit: 20
        }

        const createTable = new CreateTable()
        const table = createTable.execute(options)
        const rows = table.split('\n')
        expect( table ).toContain('3 x 1 = 3')
        expect( table ).toContain('3 x 20 = 60')
        expect( rows.length ).toBe(options.limit + 1)
    })

})