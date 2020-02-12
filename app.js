// const path = require('path');

// let pathExt = path.extname('filename.md')
//     //this should be the input of the filename in the console!! you can check the extension
// console.log(pathExt);

// const checkFilePath = () => {
//     if (pathExt == '.md') {
//         console.log('it will proceed because its an md file')
//     } else {
//         console.log('file not recognized');
//     }
// };

// checkFilePath()


const http = require('http');

// const server = http.createServer((req, res) => {
//     //res is the response
//     const code = res.statusCode
//         // res.end('the response is: ' + code)
//     console.log(code)
// }).listen('3000');

//aqui en vez de 3000 debe ir el link que debe listenear
//TO:DO Research, how to stop listening!, research, como hacer que abra la ventana para probarlo por sí mismo


let options = { host: 'google.com' }
const req = http.request(options, function(r) {
    console.log(JSON.stringify(r.statusCode));
});
req.end();