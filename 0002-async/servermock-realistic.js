const howManyCandlesCallback = (dayNumber, callback) => {
    return setTimeout(() => {
        if ( dayNumber < 1 ) {
            return callback ('day cannot be smaller than 1');
        }
    
        if ( dayNumber > 8 ) {
            return callback ('No Isro Chag for Hannukah!');
        }
    
        return callback ( null, dayNumber + 1 );
    }, (Math.random() + 1 ) * 1000);
    
};

// const howManyCandles = async (dayNumber) => {
//     return new Promise ((resolve, reject) => {
//         howManyCandlesCallback(dayNumber, (err, result) => {
//             if ( err ) {
//                 return reject(err);
//             }
//             return resolve(result);
//         })
//     });
// }

// (async () => {
//     const t = await howManyCandles(8);
//     console.log(t);
// })();