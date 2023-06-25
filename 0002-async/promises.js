const howManyCandlesCallback = (dayNumber, callback) => {
    if ( dayNumber < 1 ) {
        return callback ('day cannot be smaller than 1');
    }

    if ( dayNumber > 8 ) {
        return callback ('No Isro Chag for Hannukah!');
    }

    return callback ( null, dayNumber + 1 );
}

const howManyCandles = async (dayNumber) => {
    return new Promise ((resolve, reject) => {
        howManyCandlesCallback(dayNumber, (err, result) => {
            if ( err ) {
                return reject(err);
            }
            return resolve(result);
        })
    });
}

Promise.all([
    howManyCandles(1),
    howManyCandles(2),
    howManyCandles(3),
    howManyCandles(4),
    howManyCandles(5),
    howManyCandles(6),
    howManyCandles(7),
    howManyCandles(8),
]).then((result) => {
    console.log(result.reduce((a, b) => (a+b), 0));
}).catch((err) => {
    console.log(err);
})