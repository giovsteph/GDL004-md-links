const inputPath = process.argv[2];

module.exports = checkFilePath = (inputPath) => {


    const checkFilePath = () => {
        let pathExt = path.extname(inputPath);
        if (pathExt == '.md') {
            parseFile(inputPath);
        } else {
            console.log('file not recognized');
        }
    };

}