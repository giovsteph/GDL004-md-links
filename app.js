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

let options = { method: 'HEAD', host: 'github.com', port: 80, path: '/' };

//its working if you don't add a slash, once you add something after .com, it always returns error

const req = http.request(options, function(req) {
    if (req.statusCode) {
        console.log('its ok')
    }
});
req.on('error', function(err) {
    //Handle error
    console.log('404 not found');
})
req.end();