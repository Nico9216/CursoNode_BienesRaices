import express from "express";

const router = express.Router();

//Routing

router.get("/nosotros",  (req, res)=> {
  res.json({ msg: "Funcionando" });
});

router.get("/", function (req, res) {
  res.send("Funcionando");
});

router.post("/",  (req, res)=> {
  res.json({ msg: "Funciona post" });
});


export default router;
