const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
const howManyCandlesCallback = (dayNumber, callback) => {
    return setTimeout(() => {
        if ( dayNumber < 1 ) {
            return callback ('day cannot be smaller than 1');
        }
    
        if ( dayNumber > 8 ) {
            return callback ('No Isro Chag for Hannukah!');
        }
    
        return callback ( null, dayNumber + 1 );
    }, randomIntFromInterval(0.2, 2) * 1000);
    
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

(async () => {
    const t = await howManyCandles(8);
    console.log(t);
})();