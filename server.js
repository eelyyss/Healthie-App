const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieSession = require("cookie-session");
const dbConfig = require("./src/backend/config/db.config");

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: '*',
  credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "healthie-session",
    keys: ["COOKIE_SECRET"],
    httpOnly: true
  })
);

const db = require("./src/backend/models");

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`)
  .then(() => {
    console.log("Successfully connected to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to HealthIE application." });
});

// Registrar las rutas
require("./src/backend/routes/auth.routes")(app);
require("./src/backend/routes/user.routes")(app);

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, 'dist/healthie-app')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/healthie-app/index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
