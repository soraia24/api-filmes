import express from "express";
import usuarios from "./routes/usuarioRoutes.js";
import filmes from "./routes/filmeRoutes.js"

const app = express();

app.use(express.json());

app.use("/usuarios", usuarios);
app.use('/filmes', filmes);


app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 🚀");
});
