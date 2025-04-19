import { create } from 'domain'
import { CreateTable } from '../../domain/use-cases/create-table.use-case'
import { ServerApp } from '../../presentation/server-app'
import { SaveFile } from '../../domain/use-cases/save-file.use-case'

describe('src/presentation/server-app.ts', () => {
    const options = {
        base: 5,
        limit: 10,
        showTable: true,
        fileName: 'Test-name',
        fileDestination: 'test-destination',
    }

    test('Should create a ServerAppo instance', () =>{

        const serverApp = new ServerApp()

        expect ( serverApp ).toBeInstanceOf( ServerApp )
        expect( typeof ServerApp.run ).toBe('function')
    })

    test('Should run server app with options', () => {
        
        const logSpy = jest.spyOn(console, 'log')
        const createTableSpy = jest.spyOn( CreateTable.prototype, 'execute')
        const saveFileSpy = jest.spyOn( SaveFile.prototype, 'execute')



        ServerApp.run( options )

        // expect( logSpy ).toHaveBeenCalledTimes(3) En caso de que debamos indicar la cantidad de veces del llamado
        expect( logSpy ).toHaveBeenCalledWith('Server running...') // En caso de que queramos comprobar el argumento con el que fue llamada una función
        expect( logSpy ).toHaveBeenCalledWith('File created succesfully.')

        expect( createTableSpy ).toHaveBeenCalledTimes(1)
        expect( createTableSpy ).toHaveBeenCalledWith( {base: options.base, limit: options.limit })

        expect( saveFileSpy ).toHaveBeenCalledTimes(1)
        expect( saveFileSpy ).toHaveBeenCalledWith( {
            fileContent: expect.any(String),
            fileName: options.fileName,
            fileDestination: options.fileDestination
          })

    })

    test('should run with custom values mocked', () => {
    
        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createMock   = jest.fn().mockReturnValue('1 x 2 = 2');
        const saveFileMock = jest.fn().mockReturnValue(false);
    
        console.log = logMock;
        console.error = logErrorMock;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;
    
    
        ServerApp.run(options);
    
        expect( logMock ).toHaveBeenCalledWith('Server running...');
        expect( createMock ).toHaveBeenCalledWith({"base": options.base, "limit": options.limit });
        expect( saveFileMock ).toHaveBeenCalledWith({
          fileContent: '1 x 2 = 2',
          fileDestination: options.fileDestination,
          fileName: options.fileName,
        });
        // expect( logMock ).toHaveBeenCalledWith('File created!');
        expect( logErrorMock ).not.toBeCalledWith();
    
    
      });

})