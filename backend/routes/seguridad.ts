import { Router } from 'express';
import { validarJWT } from '../middleware/validarJwt';
import { getColumna, getConsultarTabla, getConsultarArbol, getCombo, egecutarListaSql, getEliminar, getOpciones, auditoriaAccesoPantalla, esUnico, getClientes, getReglasClaveString, cambiarClave, changePassword, saveUser, getConsultaGenerica, updateGenerico, resetPassword, usuarioActivos } from '../controllers/seguridadCtrl';

const router = Router();

router.post("/api/seguridad/getColumnas", validarJWT, getColumna);
router.post("/api/seguridad/getConsultarTabla", validarJWT, getConsultarTabla);
router.post("/api/seguridad/getConsultarArbol", validarJWT, getConsultarArbol);
router.post("/api/seguridad/getCombo", validarJWT, getCombo);
router.post("/api/seguridad/ejecutarLista", validarJWT, egecutarListaSql);
router.post("/api/seguridad/saveUser", validarJWT, saveUser);
router.post("/api/seguridad/eliminar", validarJWT, getEliminar);
router.post("/api/seguridad/getConsultaGenerica", validarJWT, getConsultaGenerica);
router.post("/api/seguridad/updateGenerico", validarJWT, updateGenerico);
router.post("/api/seguridad/getOpciones", validarJWT, getOpciones);
router.post("/api/seguridad/auditoriaAccesoPantalla", validarJWT, auditoriaAccesoPantalla);
router.post("/api/seguridad/esUnico", validarJWT, esUnico);
router.post("/api/seguridad/getCliente", validarJWT, getClientes);
router.get("/api/seguridad/getReglasClave", validarJWT, getReglasClaveString);
router.post("/api/seguridad/cambiarClave", validarJWT, cambiarClave);
router.post("/api/seguridad/resetPassword", validarJWT, resetPassword);
router.post("/api/seguridad/getusuarios", validarJWT, usuarioActivos);
router.post("/api/seguridad/changePassword", changePassword);

export default router;