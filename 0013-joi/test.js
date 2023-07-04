const joi = require('joi');

const myValidator = joi.object({
    name: joi.string(),
    age: joi.number().min(18),
});
// const obj = {
//     name: 'shahar',
//     age: 17,
// };

// const result = myValidator.validate(obj);
// console.log(result);
(async() => {
    const myValidator = joi.object({
        name: joi.string().required().email().uppercase(),
        age: joi.number().required().min(18),
    });

    const obj = {
        name: 'shahar@solomianik.com',
        age: '19',
        email: 'jkfdshjsfk',
    };

    const validated = await myValidator.validateAsync(obj);

    console.log(validated);
})();