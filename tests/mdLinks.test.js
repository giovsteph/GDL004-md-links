const checkFilePath = require('./checkPath.js')
const parseFile = require('./parseFile.js')
const validateLinks = require('./validateLink.js')

console.log(checkFilePath);
console.log(parseFile);
console.log(validateLinks);


describe('Sample Test', () => {
    it('should test that true === true', () => {
        expect(true).toBe(true)
    })
})

describe('checkFilePath', () => {
    it('Check File Path debería ser una función', () => {
        expect(typeof checkFilePath).toBe('function');
    })
})

describe('parseFile', () => {
    it('Parse File Deberìa ser una funcion', () => {
        expect(typeof parseFile).toBe('function');
    })
})

describe('validateLinks', () => {
    it('Validate Links Deberìa ser una funcion', () => {
        expect(typeof validateLinks).toBe('function');
    })
})