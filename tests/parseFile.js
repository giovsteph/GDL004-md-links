module.exports = parseFile = () => {
    const parseFile = (inputPath) => {
        fs.readFile(inputPath, 'utf8', (err, data) => {
            if (!err) {
                const regex = new RegExp(/\[(.*)\]\((https?:\/\/[^\s\){0}]+)\)/g);

                const getMatches = (data, regex, index) => {
                    index || (index = 1); // default to the first capturing group
                    let matches = [];
                    let match;
                    while (match = regex.exec(data)) {
                        matches.push(match[index]);
                    }
                    return matches;
                }

                let links = getMatches(data, regex, 2);
                let names = getMatches(data, regex, 1);


                if (links) {

                    //function to validate, pass the links as parameter
                    validateLinks(links, names);
                } else {
                    console.log('no links found');
                }
            } else {
                //error reading files
                console.log('an error ocurred');
                console.error(error.message);
            }
        });
    };

}