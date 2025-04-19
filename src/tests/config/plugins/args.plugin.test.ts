
const runCommand = async ( args: string[] ) => {
    process.argv = [ ...process.argv, ...args];
    const { yarg } = await import('../../../config/plugins/args.plugin')
    return yarg
}

describe('src/config/plugins/args.plugin.ts', () => {

    const originalArgv = process.argv

    beforeEach(() => {
        process.argv = originalArgv
        jest.resetModules()
    })

    test('Should return default values', async () => {
        const yarg = await runCommand(['-b', '5'])
        
        expect( yarg ).toStrictEqual( expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'multiplication-table',
            d: 'outputs/data',
          }))
    })

    test('Should return configuration with custom values', async () => {
        const yarg = await runCommand(['-b', '8', '-l', '20', '-s', 'true', '-n', 'custom', '-d', 'outputs/custom'])
        console.log(yarg);
        
        expect( yarg ).toStrictEqual( expect.objectContaining({
            b: 8,
            l: 20,
            s: true,
            n: 'custom',
            d: 'outputs/custom',
          }))
    })


})