import { Router } from "express";
import { generateToken } from "../utils.js";
import passport from "passport";

import UserManager from "../dao/mongoManager/UsersManager.js";
const router = Router();
const User = new UserManager();
router.post(
  "/registro",
  passport.authenticate("register", {
    passReqToCallback: true,
  }),
  (req, res) => {
    const user = req.user;
    try {
      const token = generateToken(user);
      res
        .cookie("token", token, {
          httpOnly: true,
          signed: true,
          maxAge: 3600000,
        })
        .json({ message: "User creado con exito", token });
    } catch (error) {
      res.status(500).json({ message: "Error al crear usuario" });
    }
  }
);
router.post(
  "/login",
  passport.authenticate("login", {
    passReqToCallback: true,
    session: false,
  }),
  async (req, res) => {
    const user = req.user;
    try {
      const token = generateToken(user);
      res
        .cookie("token", token, {
          httpOnly: true,
          signed: true,
          maxAge: 3600000,
        })
        .json({ status: "Successful", token });
    } catch (error) {
      res.status(500).json({ message: "Error al loguear usuario" });
    }
  }
);

export default router;
