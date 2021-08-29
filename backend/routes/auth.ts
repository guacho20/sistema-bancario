import { Router } from "express";
import { getInit, login, tokenrenew, logout, pantallasMasUsadas } from '../controllers/authCtrl';
import { validarJWT } from '../middleware/validarJwt';

const router = Router();

router.get('/', getInit);
router.post('/api/auth/login', login);
router.post('/api/auth/logout', logout);
router.get("/api/auth/renew", validarJWT, tokenrenew);
router.post("/api/auth/pantallasMasUsadas", validarJWT, pantallasMasUsadas);

export default router;