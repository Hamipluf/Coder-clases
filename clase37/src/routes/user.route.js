import { Router } from "express";
import passport from "passport";
import {
  loginUser,
  logoutUser,
  registerUser,
  getCurrentUser,
  recoveryUser,
  setNewPass,
} from "../controller/user.controller.js";

const router = Router();

// Register Local passport
router.post(
  "/register",
  passport.authenticate("signIn", {
    session: false,
    passReqToCallback: true,
  }),
  registerUser
);
// Login Local passport
router.post(
  "/login",
  passport.authenticate("login", {
    passReqToCallback: true,
    session: false,
  }),
  loginUser
);

router.get(
  "/current",
  passport.authenticate("jwtCookies", { session: false }),
  getCurrentUser
);
router.get("/recovery/:id", recoveryUser);
router.post("/setNewPass/:id", setNewPass);
router.get("/logout", logoutUser);

export default router;
