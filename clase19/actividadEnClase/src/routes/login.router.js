import { Router } from "express";

const router = Router();
router.post("/", (req, res) => {
  const { nombre, email } = req.body;
  res
    .cookie(nombre, email, { maxAge: 15000 })
    .send("Cookie Guardada con exito");
});
router.post("/session", (req, res) => {
 console.log(req);
 
});

export default router;
