import fs from "fs";
import { join } from "path";
import { __dirname } from "../../utils.js";

const path = join(__dirname, "/Courses.json");
export default class CoursesManager {
  async getAllCourses() {
    if (fs.existsSync(path)) {
      try {
        const coursesFile = fs.promises.readFile(path, "utf-8");
        return JSON.parse(coursesFile);
      } catch (error) {
        return error;
      }
    } else {
      return [];
    }
  }

  async createCourse(course) {
    try {
      const coursesFile = await this.getAllCourses();
      // DEVUELVE []
      let id;
      if (coursesFile === 0) {
        id = 1;
      } else {
        // voy hasta el ultimo elemento para incrementar el id
        id = coursesFile[coursesFile.length - 1].id + 1;
        const newCourse = { id, ...course };
        console.log(newCourse);
        coursesFile.push(newCourse);
        await fs.promises.writeFile(path, JSON.stringify(coursesFile));
      }
    } catch (error) {
      return error;
    }
  }
}
