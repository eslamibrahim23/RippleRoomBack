const mongoose = require("mongoose");
const Joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const JoiPassword = Joi.extend(joiPasswordExtendCore);

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Phone: {
      type: Number,
    },
    Bio: {
      type: String,
    },
    Address: String,
    Image: String,
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
