import yargs, { boolean, number } from 'yargs'
import { hideBin } from 'yargs/helpers'

export const yarg = yargs( hideBin(process.argv) )
.option('b', {
    alias: 'base',
    type:'number',
    demandOption: true,
    describe: 'Number for create the table'
})
.option('l', {
    alias: 'limit',
    type: 'number',
    demandOption: false,
    default: 10,
    describe: 'multiplication table limit'
})
.option('s', {
    alias: 'show',
    type: 'boolean',
    default: false,
    describe: 'Show multiplication table'
})
.option('n', {
    alias:'name',
    type: 'string',
    default: 'multiplication-table',
    describe: 'File name'
})
.option('d', {
    alias: 'destination',
    type:'string',
    default:'outputs/data',
    describe: 'FIle destination'
})
.check(( argv, options ) => {

    if ( argv.b < 1 ) throw new Error('Error: base must be greater than 0')

    return true
})
.parseSync()