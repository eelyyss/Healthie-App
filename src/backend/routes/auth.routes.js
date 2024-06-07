const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Origin",
      "http://localhost:3000, https://healthie-six.vercel.app"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });

  app.post(
    "/api/auth/signup",
    verifySignUp.checkDuplicateUsernameOrEmailOrDocument,
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.post("/api/auth/signout", controller.signout);
};

