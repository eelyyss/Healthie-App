const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const cors = require("cors");

module.exports = function(app) {
  const corsOptions = {
    origin: ['http://localhost:3000', 'https://healthie-six.vercel.app'],
    credentials: true,
    optionsSuccessStatus: 200
  };

  app.use(cors(corsOptions));

  app.post(
    "/api/auth/signup",
    verifySignUp.checkDuplicateUsernameOrEmailOrDocument,
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.post("/api/auth/signout", controller.signout);
};
