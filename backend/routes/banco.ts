import { Router } from "express";
import { getClientes, getCuentasCliente, getCuentasClienteAll, getClientesExcluido, getTransacciones, getTicket } from '../controllers/bancoCtrl';
import { validarJWT } from '../middleware/validarJwt';

const router = Router();

router.post('/api/banco/getClientes', validarJWT, getClientes);
router.post('/api/banco/getCuentasCliente', validarJWT, getCuentasCliente);
router.post('/api/banco/getCuentasClienteAll', validarJWT, getCuentasClienteAll);
router.post('/api/banco/getClientesExcluido', validarJWT, getClientesExcluido);
router.post('/api/banco/getTransacciones', validarJWT, getTransacciones);
router.post('/api/banco/getTicket', getTicket);

export default router;