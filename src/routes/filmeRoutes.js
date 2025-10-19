import express from 'express';
import * as filmeController from '../controllers/filmeController.js';
import { autenticarToken } from '../middleware/authMiddleware.js';
import { verificarAdmin } from '../middleware/verificarAdmin.js';

const router = express.Router();

router.get('/', autenticarToken, filmeController.listar);
router.get('/:id', autenticarToken, filmeController.buscar);
router.post('/cadastrar', autenticarToken, verificarAdmin, filmeController.cadastrar);
router.put('/:id',autenticarToken, verificarAdmin, filmeController.atualizar);
router.delete('/:id',autenticarToken, verificarAdmin, filmeController.deletar);

export default router;
