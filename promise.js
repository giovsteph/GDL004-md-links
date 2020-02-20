let promise = new Promise((resolve, reject) => {
    let a = 2 + 2;
    if (a == 5) {
        resolve('success')
    } else {
        reject('failed')
    }
});

promise.then((message) => {
    console.log('then ' + message);

}).catch((message) => {
    console.log('catch ' + message);

});