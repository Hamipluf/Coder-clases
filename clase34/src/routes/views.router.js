import { Router } from "express";
import passport from "passport";
import {
  loginView,
  errorRegistroView,
  homeView,
  profileView,
  registerView,
  cartView,
  checkOutView,
} from "../controller/view.controller.js";
const router = Router();

router.get("/", loginView);

router.get(
  "/home",
  passport.authenticate("jwtCookies", { session: false }),
  homeView
);

router.get("/register", registerView);

router.get(
  "/profile",
  passport.authenticate("jwtCookies", { session: false }),
  profileView
);
router.get(
  "/cart",
  passport.authenticate("jwtCookies", { session: false }),
  cartView
);
router.get(
  "/checkout",
  passport.authenticate("jwtCookies", { session: false }),
  checkOutView
);

router.get("/errorRegistro", errorRegistroView);

export default router;
