const mongoose = require("mongoose");
const Joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const JoiPassword = Joi.extend(joiPasswordExtendCore);

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },
    cPassword: {
      type: String,
    },
  },
  { timestamps: true }
);

const Users = mongoose.model(`user`, userSchema);
module.exports = { Users };
