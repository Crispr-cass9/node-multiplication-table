import fs from 'fs';
import { SaveFile } from '../../../domain/use-cases/save-file.use-case'
import { error } from 'console';

describe('src/domain/use-cases/save-file.use-case.ts', () => {

    // beforeEach( () => {
    //     Limpiar la carpeta de outputs para evitar falsos positivos en este test
    //     fs.rmSync('outputs', { recursive: true });

    // });

    afterEach( () => {
    // También se podría realizar luego de cada prueba
        const fileExist = fs.existsSync('/outputs')
        if (fileExist) fs.rmSync('outputs', { recursive: true });
    })

    // beforeEach( () => {
    //     jest.clearAllMocks()
    // })
    // Con esto podemos limpiar todos los mocks para poder


    test('should save file with default values', () => {
        const saveFile = new SaveFile();
        const options = {
            fileContent: 'Test content'
        }
        const filePath = 'outputs/data/table.txt'
        const isFileSaved = saveFile.execute( options );
        const checkFile = fs.existsSync(filePath)
        const fileContent = fs.readFileSync( filePath, { encoding: 'utf-8'})
        expect( isFileSaved ).toBe(true)
        expect ( checkFile ).toBeTruthy()
        expect ( fileContent ).toBe( options.fileContent )    
    })

    test('Should save file with custom values', () => {

        const options = {
            fileContent: 'Test Custom content',
            fileDestination: 'outputs/custom/data',
            fileName: 'CustomName'
        }
        const filePath = options.fileDestination+'/'+options.fileName+'.txt'

        const saveFile = new SaveFile()
        const isFileSaved = saveFile.execute( options )
        const checkFile = fs.existsSync(filePath)
        const fileContent = fs.readFileSync( filePath, { encoding: 'utf-8'})

        expect( isFileSaved ).toBeTruthy()
        expect( checkFile ).toBeTruthy()
        expect( fileContent ).toBe(options.fileContent)
    })


    test('Should return false if directory couldn`t be created', () => {
        const options = {
            fileContent: 'Test Custom content',
            fileDestination: 'outputs/custom/data',
            fileName: 'CustomName'
        }
        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => {throw new Error('Error inventado para hacer el test')}
        )

        const result = saveFile.execute( options )
        expect( result ).toBeFalsy()

        mkdirSpy.mockRestore(); // Elimina el mock y el spy, restaurandolo a su estado original para que no afecte a futuras pruebas
    })

    test('Should return false if file can`t be created', () => {
        const options = {
            fileContent: 'Test Custom content',
            fileDestination: 'outputs/custom/data',
            fileName: 'CustomName'
        }
        const saveFile = new SaveFile();
        // const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
        //     () => {throw new Error('Error inventado para hacer el test')}
        // )
        
        const writFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => { throw new Error ('Error inventado para el testing') }
        );
        const result = saveFile.execute( options );
        expect( result ).toBeFalsy();
    
        writFileSpy.mockClear();

    })



})