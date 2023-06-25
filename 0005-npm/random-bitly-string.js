const letters = ['a','b','c','d', 'e'];

let ret = '';
for(i=0; i < 5; i++) {
    const rand = Math.round(Math.random(3));
    ret += letters[rand];
}
console.log(ret);

// hint
// Math.random()
// Math.round()


