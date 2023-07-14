import express from "express";
import { formularioLogin,formularioRegistro,formularioOlvidePassword,registrar,confirmar, 
    resetPassword,comprobarToken,nuevoPassword } from "../controllers/usuarioController.js";
const router = express.Router();

//Routing

router.get("/login",formularioLogin);

router.get("/registro",formularioRegistro);
router.post("/registro",registrar);

router.get("/olvide-password",formularioOlvidePassword);
router.post("/olvide-password",resetPassword);

router.get('/confirmar/:token',confirmar) //Routing dinámica, cualquier valor después del confirmar/ se asignará a la variable token

//Almacena el nuevo password
router.get('/olvide-password/:token',comprobarToken);
router.post('/olvide-password/:token',nuevoPassword);

// router.get("/", function (req, res) {
//   res.send("Funcionando");
// });

// router.post("/",  (req, res)=> {
//   res.json({ msg: "Funciona post" });
// });


export default router;
