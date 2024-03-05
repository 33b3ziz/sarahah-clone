const joi = require("joi");
const methods = ["body", "params"];
const schema = {
  body: joi.object({
    name: joi.string().min(3).max(20).required(),
    email: joi.string().email().required(),
    password: joi
      .string()
      .pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      .required(),
    repassword: joi.ref("password"),
    age: joi.number().min(18).max(60).required(),
  }),
  params: joi.object({
    id: joi.string().min(3).max(24),
  }),
};
module.exports.userValidation = (req, res, next) => {
  let Errors = [];
  methods.map((key) => {
    const { error } = schema[key].validate(req[key], { abortEarly: false });
    if (error) {
      error.details.map((msg) => {
        Errors.push(msg.message);
      });
    }
  });
  if (Errors.length > 0) {
    res.json(Errors);
  } else {
    next();
  }
};
