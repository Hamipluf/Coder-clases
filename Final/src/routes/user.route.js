import { Router } from "express";
import passport from "passport";
import {
  loginUser,
  logoutUser,
  registerUser,
  getCurrentUser,
  recoveryUser,
  setNewPass,
  setRole,
  getAllUsers,
  deleteUser
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
router.get("/", getAllUsers);
router.get("/recovery/:id", recoveryUser);
router.get("/logout", logoutUser);
router.post("/premium/:uid", setRole);
router.post("/setNewPass/:id", setNewPass);
router.delete("/", deleteUser)

export default router;
