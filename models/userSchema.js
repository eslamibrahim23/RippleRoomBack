const mongoose = require("mongoose");
const Joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const JoiPassword = Joi.extend(joiPasswordExtendCore);

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Joi validation schema
const validationSchema = Joi.object({
  _id: Joi.required(),
  firstname: Joi.string().min(3).required(),
  lastname: Joi.string().min(3).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: JoiPassword.string()
    .min(8)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .required(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
});

// Mongoose pre-save hook for validation
userSchema.pre("save", function (next) {
  const validation = validationSchema.validate(this.toObject());
  if (validation.error) {
    const err = validation.error.details[0].message;

    return Promise.reject(
      "Validation Error: " + validation.error.details[0].message
    ); // Reject the Promise with the validation error
    // Handle validation error (throw an error or handle it based on your application logic)
    next(res.json({ err, status: "failed! " }));
  } else {
    // Validation successful, continue with the save operation
    next();
  }
});

module.exports = mongoose.model("user", userSchema);
