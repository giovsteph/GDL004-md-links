const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const https = require('https');
const http = require('http');

const inputPath = process.argv[2];
const inputOptions = process.argv[3];
const inputOptionsTwo = process.argv[4];

let validLinks = [];
let validLinksCount = 0;
let wrongLinks = [];
let wrongLinksCount = 0;


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
    let promise = new Promise((resolve, reject) => {

        for (let i = 0; i < links.length; i++) {
            fetch(links[i])
        }
        if (res.status >= 400) {
            resolve(
                wrongLinksCount++);
            // console.log(wrongLinksCount+ " Wrong Link : "+ res.status  + links[i] );
            wrongLinks.push(links[i] + ' FAIL: ' + res.status);
        } else if (res.status == 1) {
            reject('failed')
        } else {
            resolve(
                    validLinksCount++)
                // console.log(res.status + " Successful match " + links[i] +validLinksCount);
            validLinks.push(links[i] + ' OK: ' + res.status);

        }

    }).then((wrongLinks, validLinks) => {
        // if (inputOptions === '--validate') {
        console.log('wrong ' + wrongLinks);
        console.log(validLinks);
        // } else if (inputOptions === '--stats' && inputOptionsTwo === '--validate') {
        //     console.log('Total: ' + links.length + '\n' + 'Unique: ' + validLinksCount);
        //     console.log('Broken: ' + wrongLinksCount);
        //     console.log(wrongLinks);
        //     console.log(validLinks);
        // } else if (inputOptions === '--stats') {
        //     console.log('Total: ' + links.length + '\n' + 'Unique: ' + validLinksCount);
        // }
    }).catch((error) => {
        console.error('Error');
    });
}






//correr función inicial hasta el final - asyncronous js
checkFilePath();