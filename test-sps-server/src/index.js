require('dotenv').config();

const express = require("express");
const routes = require("./routes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());    // Para receber JSON no body

app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);   // Comando alterado para facilitar mudança da porta!
});


