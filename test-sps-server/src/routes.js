const { Router } = require("express");
const authenticateToken = require("./middlewares/auth");
const { login } = require("./controllers/authController");
const {
  listUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser
} = require("./controllers/userController");

const routes = Router();

// Rota publica para o login (Não necessario autenticação!)
routes.post("/auth/login", login);

// Demais rotas
routes.get("/users", authenticateToken, listUsers);
routes.get("/users/:userId", authenticateToken, getUser);
routes.post("/users", authenticateToken, createUser);
routes.put("/users/:userId", authenticateToken, updateUser);
routes.delete("/users/:userId", authenticateToken, deleteUser);

routes.get("/", (req, res) => {
  res.send("API SPS Group - Teste Tecnico!");
});

module.exports = routes;
