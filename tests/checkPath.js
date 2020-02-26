const inputPath = process.argv[2];

module.exports = checkFilePath = () => {

    const path = require('path');

    const checkFilePath = (inputPath) => {
        let pathExt = path.extname(inputPath);
        if (pathExt == '.md') {
            parseFile(inputPath);
        } else {
            console.log('file not recognized');
        }
    };

}