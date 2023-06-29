const howManyCandlesCallback = (dayNumber, callback) => {
    if ( dayNumber < 1 ) {
        return callback ('day cannot be smaller than 1');
    }

    if ( dayNumber > 8 ) {
        return callback ('No Isro Chag for Hannukah!');
    }

    return callback ( null, dayNumber + 1 );
}

const howManyCandles = (dayNumber) => {
    return new Promise ((resolve, reject) => {
        howManyCandlesCallback(dayNumber, (err, result) => {
            if ( err ) {
                return reject(err);
            }
            return resolve(result);
        })
    });
}

const promises = [];
for (let i=1; i < 9; i++) {
    promises.push(howManyCandles(i));
}

// Promise.all(promises).then((results) => {
//     console.log(results.reduce((a, b) => (a + b), 0));
// }).catch((err) => {
//     console.log(err);
// })

(async () => {
    const results = await Promise.all(promises);
    console.log(results.reduce((a, b) => (a+b), 0));
})();



