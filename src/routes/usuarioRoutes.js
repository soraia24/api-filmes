import express from "express";
import * as usuariosController from "../controllers/usuarioController.js"
import { verificarProprioUsuario } from "../middleware/verificarProprioUsuario.js";
import { autenticarToken } from '../middleware/authMiddleware.js';
import { verificarAdmin } from "../middleware/verificarAdmin.js";
import { autenticarTokenOptional } from "../middleware/authTokenOpcional.js";

const router = express.Router();

router.get("/",autenticarToken, verificarAdmin,  usuariosController.todosUsuarios);
router.get("/:id",autenticarToken, verificarAdmin, usuariosController.buscar);
router.post('/cadastrar', autenticarTokenOptional, usuariosController.novoUsuario);
router.post('/login', usuariosController.login);
router.put('/:id', autenticarToken, verificarProprioUsuario, usuariosController.atualizar);
router.delete('/:id', autenticarToken, verificarProprioUsuario, usuariosController.deletar);

export default router;
