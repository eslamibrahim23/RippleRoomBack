const User = require("../models/userSchema");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    //new
    const checkUserExisting = await User.findOne({ email });
    if (checkUserExisting) {
      return res.status(404).json({ message: "User is already Existing" });
    }
    //
    const hashedPassword = await bcryptjs.hash(password, 10);
    await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const visitor= await User.findOne({email})
    if(!visitor)
    return res.status(400).json({ message: "please signup first" })

    const comparePassowrd = await bcryptjs.compare(
      password,
      visitor.password
    );
    if (!comparePassowrd)
      return res.status(400).json({ message: "wrong Password" });
    const token = jwt.sign(
      {
        _id: visitor._id,
        email: visitor.email,
        firstname: visitor.firstname,
        lastname: visitor.lastname,
      },
      process.env.PRIVATE_KEY_TOKEN
    );
   return res.json({token});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { signup, login };
