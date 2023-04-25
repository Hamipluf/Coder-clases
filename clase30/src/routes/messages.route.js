import { Router } from "express";
import { getMessages } from "../../../clase30/src/controller/message.controller.js";
const router = Router();

router.get("/", getMessages);

export default router;
