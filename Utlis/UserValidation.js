const Joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const JoiPassword = Joi.extend(joiPasswordExtendCore);

const Userschema = Joi.object({
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3),
  Email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  Password: JoiPassword.string()
    .min(8)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .required(),
  cPassword: JoiPassword.string()
    .min(8)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
});
const loginschema = Joi.object({
  Email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  Password: JoiPassword.string()
    .min(8)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .required(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
});

module.exports = { Userschema, loginschema };
