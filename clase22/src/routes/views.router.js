import { Router } from "express";
import { protectedRute } from "../utils.js";
const router = Router();

router.get("/", (req, res) => {
  res.render("login");
});

router.get("/home", protectedRute, (req, res) => {
  res.render("home");
});

router.get("/register", (req, res) => {
  res.render("registro");
});

router.get("/profile", protectedRute, (req, res) => {
  res.render("profile");
});

router.get("/errorRegistro", (req, res) => {
  res.render("errorRegistro");
});

export default router;
