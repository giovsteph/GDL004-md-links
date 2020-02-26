const checkFilePath = require('./checkPath.js')
const parseFile = require('./parseFile.js')
const validateLinks = require('./validateLink.js')


describe('checkFilePath', () => {
    it('Check File Path debería ser una función', () => {
        expect(typeof checkFilePath).toBe('function');
    })
})

describe('parseFile', () => {
    it('Parse File Deberìa ser una función', () => {
        expect(typeof parseFile).toBe('function');
    })

})

describe('validateLinks', () => {
    it('Validate Links Deberìa ser una función', () => {
        expect(typeof validateLinks).toBe('function');
    })
})