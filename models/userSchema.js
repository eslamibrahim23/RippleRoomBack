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
    Password: {
      type: String,
    },
    Image: {
      type: String,
    },
    Bio: {
      type: String,
      default: "Hi there !",
    },

    Phone: {
      type: Number,
    },

    Address: {
      type: String,
    },

    cPassword: {
      type: String,
    },
  },
  { timestamps: true }
);

const Users = mongoose.model(`user`, userSchema);
module.exports = { Users };
