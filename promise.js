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


const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then(function(values) {
    console.log(values);
});