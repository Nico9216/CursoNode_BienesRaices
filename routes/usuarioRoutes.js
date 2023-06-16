import express from "express";
import { formularioLogin,formularioRegistro,formularioOlvidePassword,registrar } from "../controllers/usuarioController.js";
const router = express.Router();

//Routing

router.get("/login",formularioLogin);
router.get("/registro",formularioRegistro);

router.post("/registro",registrar);

router.get("/olvide-password",formularioOlvidePassword);

// router.get("/", function (req, res) {
//   res.send("Funcionando");
// });

// router.post("/",  (req, res)=> {
//   res.json({ msg: "Funciona post" });
// });


export default router;
