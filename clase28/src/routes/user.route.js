import { Router } from "express";
import passport from "passport";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/user.controller.js";

const router = Router();
router.post(
  "/registro",
  passport.authenticate("register", {
    passReqToCallback: true,
  }),
  registerUser
);
router.post(
  "/login",
  passport.authenticate("login", {
    passReqToCallback: true,
    session: false,
  }),
  loginUser
);
router.get("/logout", logoutUser);

export default router;
