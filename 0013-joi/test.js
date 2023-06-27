const joi = require('joi');

const myValidator = joi.object({
    name: joi.string().required().alphanum().uppercase(),
    age: joi.number().greater(18),
});

(async() => {
    const obj = {
        name: 'shahar',
        age: 22
    };

    const validated = await myValidator.validateAsync(obj);

    console.log(validated);
})();