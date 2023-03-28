import { Router } from "express";
import passport from "passport";

const router = Router();

router.get(
  "/current",
  passport.authenticate("jwtCookies", { session: false }),
  (req, res) => {
    res.json({ data: req.user });
  }
);

export default router;
