const createHttpError = require('http-errors');

module.exports = (validator) => async (req, res, next) => {
  try {
    const validated = await validator.validateAsync(req.body);
    req.body = validated;
    return next();
  } catch (err) {
    //* Pass err to next
    //! If validation error occurs call next with HTTP 422. Otherwise HTTP 500
    if (err.isJoi) { return next(createHttpError(422, { message: err.message })); }
    return next(createHttpError(500));
  }
};