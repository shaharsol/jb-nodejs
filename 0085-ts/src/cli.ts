import { NextFunction, Request, Response } from "express";

const name = 'Shahar';
const aNumberAge = 24;
const aStringAge = '24';

type Person = {
    name: string,
    age: number,
};

const person: Person = {
    name,
    age: aNumberAge
};

console.log(person);

const a = (req: Request, res: Response, next: NextFunction) => {
    req.getMaxListeners();
    res.send(200);
}