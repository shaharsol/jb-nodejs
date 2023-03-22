const name = 'Shahar';
const aNumberAge = 24;
const aStringAge = '24';

type Person = {
    name: string,
    age: number,
};

const person: Person = {
    name,
    age: aStringAge
};

console.log(person);

