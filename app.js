const path = require('path');

const pathExt = path.extname(process.argv[2])
    //this should be the input of the filename in the console!! you can check the extension
console.log(pathExt);

const checkFilePath = () => {
    if (pathExt == '.md') {
        console.log('it will proceed because its an md file')
    } else {
        console.log('file not recognized');
    }
};

checkFilePath()


const http = require('http');

//its working if you don't add a slash, once you add something after .com, it always returns error
//host option should be links found in document


let options = { method: 'HEAD', host: process.argv[3], port: 80, path: '/' };

const req = http.request(options, function(req) {
    if (req.statusCode == 200 || 301 || 302 || 307 || 308) {
        console.log('Link is working')
    }
});
req.on('error', function(err) {
    //Handle error
    console.log('404 not found');
})
req.end();