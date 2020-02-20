const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const https = require('https');
const http = require('http');

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

async function validateLinks(links) {
    for (let i = 0; i < links.length; i++) {
        fetch(links[i])
            .then(res => {
                if (res.status >= 400) {

                    notOkLinksCount++;
                    notOkLinks.push(links[i] + ' FAIL : ' + res.status);
                } else {
                    okLinks.push(links[i] + ' OK : ' + res.status);
                    return okLinksCount++;
                }

            }).then(() => {
                if (inputOptions === '--validate') {
                    setTimeout(function() {
                        console.table(notOkLinks);
                        console.table(okLinks);
                    }, 2800);
                } else if (inputOptions === '--stats' && inputOptionsTwo === '--validate') {
                    setTimeout(function() {
                        console.table('Total: ' + links.length + '\n' + 'Unique: ' + okLinksCount);
                        console.table('Broken: ' + notOkLinksCount);
                        console.table(notOkLinks);
                        console.table(okLinks);
                    }, 2800);
                } else if (inputOptions === '--stats') {
                    setTimeout(function() {
                        console.group('Stats Links ');
                        console.table('Total: ' + links.length + '\n' + 'Unique: ' + okLinksCount);
                        console.groupEnd('Valid Links');
                    }, 2800);
                }
            }).catch((error) => {
                console.error('Error');
            });
    }
}




/************************************************PROMISE ATTEMPT***************************************************/
// const validateLinks = (links) => {

//     let promise = new Promise((resolve, reject) => {
//         console.log(links);

//         for (let i = 0; i < links.length; i++) {
//             fetch(links[i])

//             if (res.status >= 400) {
//                 resolve(
//                     notOkLinksCount++);
//                 notOkLinks.push(links[i] + ' FAIL: ' + res.status);
//             } else if (res.status === 1) {
//                 reject('failed')
//             } else {
//                 resolve(
//                     okLinksCount++)
//                 okLinks.push(links[i] + ' OK: ' + res.status);

//             }
//         }

//     })

//     promise.then((notOkLinks, okLinks) => {
//         //        if (inputOptions === '--validate') {
//         console.log('wrong ' + notOkLinks);
//         console.log(okLinks);
//         // } else if (inputOptions === '--stats' && inputOptionsTwo === '--validate') {
//         //     console.log('Total: ' + links.length + '\n' + 'Unique: ' + okLinksCount);
//         //     console.log('Broken: ' + notOkLinksCount);
//         //     console.log(notOkLinks);
//         //     console.log(okLinks);
//         // } else if (inputOptions === '--stats') {
//         //     console.log('Total: ' + links.length + '\n' + 'Unique: ' + okLinksCount);
//         //      }
//     }).catch((error) => {
//         console.error('Error');
//     });
// }






//correr función inicial hasta el final - asyncronous js
checkFilePath();