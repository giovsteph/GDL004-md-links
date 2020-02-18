#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const process = require('process');
let link = process.argv[2];

let validLinks = [];
let validLinksCount = 0;
let wrongLinks = [];
let wrongLinksCount = 0;


const validateFile = () => {
    let extension = path.extname(link);
    if (extension === '.md') {
        //  console.log('soy un .md wuuu, mira:' + extension);
        readFile(link);
    } else {
        console.error('File no valid. Extension: ' + extension)
    }
}

const readFile = link => {
    fs.readFile(link, 'utf8', (err, data) => {
        if (!err) {
            const expression = /(https?:\/\/[^\s]+)/g;
            const regex = new RegExp(expression);
            const links = data.match(regex);
            validLinkers(links);
        } else {
            console.error(error.message);
        }
    })
}

const validLinkers = links => {
    for (let i = 0; i < links.length; i++) {
        // console.log(links[i]);
        fetch(links[i])
            .then(res => {
                if (res.status >= 400) {

                    wrongLinksCount++;
                    // console.log(wrongLinksCount+ " Wrong Link : "+ res.status  + links[i] );
                    wrongLinks.push(links[i] + ' STATUS CODE : ' + res.status);
                } else {
                    // console.log(res.status + " Successful match " + links[i] +validLinksCount);
                    validLinks.push(links[i] + ' STATUS CODE : ' + res.status);
                    return validLinksCount++;
                }

            }).catch((error) => {
                //  console.error('Error' + error.message);
            });
    }
    if (process.argv[3] === '--validate') {
        setTimeout(function() {
            console.group('\n' + ' Broken Links');
            console.table(wrongLinks);
            console.groupEnd('Broken Links');
            console.group('Valid Links');
            console.table(validLinks);
            console.groupEnd('Valid Links');
        }, 2800);
    } else if (process.argv[3] === '--stats' && process.argv[4] === '--validate') {
        setTimeout(function() {
            console.group('Stats Links BROKEN/VALID');
            console.table('Total: ' + links.length + '\n' + 'Unique: ' + validLinksCount);
            console.table('Broken: ' + wrongLinksCount);
            console.groupEnd('Valid Links');
        }, 2800);
    } else if (process.argv[3] === '--stats') {
        setTimeout(function() {
            console.group('Stats Links ');
            console.table('Total: ' + links.length + '\n' + 'Unique: ' + validLinksCount);
            console.groupEnd('Valid Links');
        }, 2800);
    }
}

validateFile();