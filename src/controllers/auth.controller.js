const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      dob: req.body.dob,
      gender: req.body.gender,
      documentType: req.body.documentType,
      documentNumber: req.body.documentNumber,
      province: req.body.province,
      city: req.body.city,
      phoneNumber: req.body.phoneNumber,
      terms: req.body.terms,
    });

    console.log(req.body);

    await user.save();

    res.send({ message: "User was registered successfully!" });
  } catch (err) {
    console.error("Signup error: ", err);
    res.status(500).send({ message: err.message });
  }
};


exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username
    }).select('+password');
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    const token = jwt.sign({ id: user._id }, config.secret, {
      algorithm: 'HS256',
      allowInsecureKeySizes: true,
      expiresIn: 86400,
    });

    req.session.token = token;

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email
    });
  } catch (err) {
    console.error("Signin error: ", err);
    res.status(500).send({ message: err.message });
  }
};


exports.signout = async (req, res) => {
  try {
    req.session = null;
    res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
