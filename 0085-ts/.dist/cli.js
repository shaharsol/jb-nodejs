"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const name = 'Shahar';
const aNumberAge = 24;
const aStringAge = '24';
const person = {
    name,
    age: aNumberAge
};
console.log(person);
const a = (req, res, next) => {
    req.getMaxListeners();
    res.send(200);
};
