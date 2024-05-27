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

checkRolesExisted = (req, res, next) => {
  const ROLES = db.ROLES;
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmailOrDocument,
  checkRolesExisted
};

module.exports = verifySignUp;
