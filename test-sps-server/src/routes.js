const { Router } = require("express");
const { login } = require("./controllers/authController");

const routes = Router();

// Rota publica para o login (Não necessario autenticação!)
routes.post("/auth/login", login);

routes.get("/", (req, res) => {
  res.send("API SPS Group - Teste Tecnico!");
});

module.exports = routes;
