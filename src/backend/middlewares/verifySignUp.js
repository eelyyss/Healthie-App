const db = require("../models");
const User = db.user;

checkDuplicateUsernameOrEmailOrDocument = async (req, res, next) => {
  try {
    const usernameUser = await User.findOne({ username: req.body.username });
    if (usernameUser) {
      return res.status(400).send({ message: "Failed! Username is already in use!" });
    }

    const emailUser = await User.findOne({ email: req.body.email });
    if (emailUser) {
      return res.status(400).send({ message: "Failed! Email is already in use!" });
    }

    const documentNumberUser = await User.findOne({ documentNumber: req.body.documentNumber });
    if (documentNumberUser) {
      return res.status(400).send({ message: "Failed! Document number is already in use!" });
    }

    next();
  } catch (err) {
    console.error("Error checking duplicate:", err);
    return res.status(500).send({ message: err.message || "An error occurred while checking duplicate." });
  }
};



const verifySignUp = {
  checkDuplicateUsernameOrEmailOrDocument,
};

module.exports = verifySignUp;
