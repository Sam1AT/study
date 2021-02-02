const Joi = require("joi");

const schema = Joi.object({
  username: Joi.string().alphanum().min(4).max(20).required(),
  password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,25}$/),
});

const valid = (data) => {
  return schema.validateAsync(data);
};

module.exports = valid;
