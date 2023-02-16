import { Router } from "express";
import CoursesManager from "../dao/fileManager/coursesManager.js";
const router = Router();
const couresManager = new CoursesManager();

router.get("/", async (req, res) => {
  const courses = await couresManager.getAllCourses();
  if (courses.length === 0) {
    res.status(404).json({ message: "No hay cursos disponible" });
  } else {
    res.status(200).json({ message: "Cursos encontrados", courses });
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
