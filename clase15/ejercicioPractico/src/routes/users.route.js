import { Router } from "express";
import UsersManager from "../dao/mongoManager/usersManager.js";

const router = Router();
const userManager = new UsersManager();

router.get("/", async (req, res) => {
  const users = await userManager.getAllUsers();
  if (users.length === 0) {
    res.status(404).json({ message: "No users found" });
  } else {
    res.status(200).json({ message: "Users encontrados", users });
  }
});

router.post("/", async (req, res) => {
  const course = req.body;
  try {
    const courses = await couresManager.createCourse(course);
    res.status(200).json({ message: "Cursos creados", courses });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "El curso no se a podido crear con exito" });
  }
});

export default router;
