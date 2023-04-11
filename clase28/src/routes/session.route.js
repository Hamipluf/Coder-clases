import { Router } from "express";
import passport from "passport";
import { getCurrentUser } from "../controller/session.contoller.js";
const router = Router();

router.get(
  "/current",
  passport.authenticate("jwtCookies", { session: false }),
  getCurrentUser
);

export default router;
