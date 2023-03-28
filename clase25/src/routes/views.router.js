import { Router } from "express";
import passport from "passport";
const router = Router();

router.get("/", (req, res) => {
  res.render("login");
});

router.get(
  "/home",
  passport.authenticate("jwtCookies", { session: false }),
  (req, res) => {
    res.render("home");
  }
);

router.get("/register", (req, res) => {
  res.render("registro");
});

router.get(
  "/profile",
  passport.authenticate("jwtCookies", { session: false }),
  (req, res) => {
    res.render("profile");
  }
);

router.get("/errorRegistro", (req, res) => {
  res.render("errorRegistro");
});

export default router;
