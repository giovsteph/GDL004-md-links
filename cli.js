#!/usr/bin/env node


//grab provided arguments

'use strict'

const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const chalk = require('chalk');

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
        parseFile(inputPath);
    } else {
        console.log('file not recognized');
    }
};

/**************FUNCION PARA PARSEAR ARCHIVO SI SÍ ES .MD FILE i'tll only pass here if its a md file***********/
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

/*************FUNCIÓN PARA VERIFICAR QUE LINKS ESTÉN FUNCIONANDO********/
const validateLinks = (links, names) => {
    let promises = [];
    for (let i = 0; i < links.length; i++) {
        promises.push(
            fetch(links[i]).then(res => {
                if (res.status >= 400) {
                    notOkLinksCount++;
                    notOkLinks.push(links[i] + ' FAIL : ' + res.status + ' ' + 'Name:' + ' ' + names[i]);

                } else {
                    okLinks.push(links[i] + ' OK : ' + res.status + ' ' + 'Name:' + ' ' + names[i]);
                    okLinksCount++;
                }
            }).catch((error) => {
                notOkLinksCount++;
                notOkLinks.push(links[i] + ' FAIL: FETCH LINK' + ' ' + 'Name:' + ' ' + names[i]);
            }));
    }
    Promise.all(promises).then(() => {

        if (inputOptions === '--stats' && inputOptionsTwo === '--validate') {
            console.group('\n' + 'Stats and Validate');
            console.log(chalk.magenta('Total: ' + links.length));
            console.log(chalk.cyan('Unique: ' + links.length));
            console.log(chalk.green('Ok: ' + okLinksCount))
            console.log(chalk.red('Broken: ' + notOkLinksCount));
            console.groupEnd('Stats and Validate');
        } else if (inputOptions === '--validate' && inputOptionsTwo === '--stats') {
            console.group('\n' + 'Stats and Validate');
            console.log(chalk.magenta('Total: ' + links.length));
            console.log(chalk.cyan('Unique: ' + links.length));
            console.log(chalk.green('Ok: ' + okLinksCount))
            console.log(chalk.red('Broken: ' + notOkLinksCount));
            console.groupEnd('Stats and Validate');
        } else if (inputOptions === '--validate') {
            console.group('\n' + ' Broken Links');
            console.table(notOkLinks);
            console.groupEnd('Broken Links');
            console.group('\n' + 'Valid Links');
            console.table(okLinks);
            console.groupEnd('Valid Links');
        } else if (inputOptions === '--stats') {
            console.group('\n' + 'Stats');
            console.log(chalk.magenta('Total: ' + links.length));
            console.log(chalk.cyan('Unique: ' + links.length));
            console.groupEnd('Stats');
        } else {
            console.log(chalk.cyanBright(okLinks + '\n' + notOkLinks));
        }

    });
};

checkFilePath();