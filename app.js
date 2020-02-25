const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

const inputPath = process.argv[2];
const inputOptions = process.argv[3];
const inputOptionsTwo = process.argv[4];

let okLinks = [];
let okLinksCount = 0;
let notOkLinks = [];
let notOkLinksCount = 0;


/***************FUNCION PARA VERIFICAR PATH DEL ARCHIVO, IT SHOULD BE A MD FILE************/
const checkFilePath = () => {
    let pathExt = path.extname(inputPath);
    if (pathExt == '.md') {
        console.log('md file')
        parseFile(inputPath);
    } else {
        console.log('file not recognized');
    }
};



/**************FUNCION PARA PARSEAR ARCHIVO SI SÍ ES .MD FILE i'tll only pass here if its a md file***********/

const parseFile = (inputPath) => {
    fs.readFile(inputPath, 'utf8', (err, data) => {
        if (!err) {
            const regex = new RegExp(/(https?:\/\/[^\s\){0}]+)/g);
            const links = data.match(regex);
            if (links) {
                //function to validate, pass the links as parameter
                validateLinks(links);
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

/*************FUNCIÓN PARA VERIFICAR QUE LINKS ESTÉN FUNCIONANDO********/

const validateLinks = (links) => {
    let promises = [];
    for (let i = 0; i < links.length; i++) {
        promises.push(
            fetch(links[i]).then(res => {
                if (res.status >= 400) {
                    notOkLinksCount++;
                    notOkLinks.push(links[i] + ' FAIL : ' + res.status);
                } else {
                    okLinks.push(links[i] + ' OK : ' + res.status);
                    okLinksCount++;
                }

            }).catch((error) => {
                console.error('error');
            })
        );
    }

    Promise.all(promises).then(() => {

        if (inputOptions === '--stats' && inputOptionsTwo === '--validate') {
            console.log('Total: ' + links.length + '\n' + 'Ok: ' + okLinksCount);
            console.log('Broken: ' + notOkLinksCount);
            console.log(notOkLinks);
            console.log(okLinks);
        } else if (inputOptions === '--validate' && inputOptionsTwo === '--stats') {
            console.log('Total: ' + links.length + '\n' + 'Ok: ' + okLinksCount);
            console.log('Broken: ' + notOkLinksCount);
            console.log(notOkLinks);
            console.log(okLinks);
        } else if (inputOptions === '--validate') {
            console.log(notOkLinks);
            console.log(okLinks);
        } else if (inputOptions === '--stats') {
            console.log('Total: ' + links.length + '\n' + 'Ok: ' + okLinksCount);
            console.log('Broken: ' + notOkLinksCount);
        }


    });
};


//correr función inicial hasta el final - asyncronous js
checkFilePath();