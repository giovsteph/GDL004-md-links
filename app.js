const path = require('path');
const fs = require('fs');
//const fetch = require('node-fetch');
const http = require('http');

const inputPath = process.argv[2];
const inputOptions = process.argv[3];

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
                //function to validate
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
    console.log('hello, validating links');
    console.log('this are the links: ');
    console.log(links);

    for (let i = 0; i < links.length; i++) {

        const req = http.get(links, (res) => {
            //http://www.google.com
            const statusCode = res.statusCode;
            console.log(statusCode);

            //TO-DO: RESEARCH ALL OK STATUS CODES
            if (statusCode == 200) {
                console.log('its working!!');
            } else {
                console.log('404!!!')
            }
        });

        req.on('error', e => {
            console.log('error!!')
        })
    };
};





//correr función inicial hasta el final - asyncronous js
checkFilePath();