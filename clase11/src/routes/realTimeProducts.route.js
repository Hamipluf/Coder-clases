import { Router } from "express";
import { socketServer } from "../server.js";
const router = Router();

router.get("/", (req, res) => {
  socketServer.on("connection", (socket) => {
    console.log("new user", socket.id);
  });
  res.render("realTimeProducts");
});

export default router;
