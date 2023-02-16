import fs from "fs";
import { __dirname } from "../../utils";

const path = __dirname + "/Users.json";
export default class UsersManager {
  async getAllUsers() {
    if (fs.existsSync(path)) {
      try {
        const usersFile = fs.promises.readFile(path, "utf-8");
        return JSON.parse(usersFile);
      } catch (error) {
        return error;
      }
    } else {
      return [];
    }
  }

  async createCourse(course) {
    try {
      const usersFile = await this.getAllUsers();
      // DEVUELVE []
      let id;
      if (usersFile === 0) {
        id = 1;
      } else {
        // voy hasta el ultimo elemento para incrementar el id
        id = usersFile[usersFile.length - 1].id + 1;
      }
      const newUser = { id, ...course };
      usersFile.push(newUser);
      await fs.promises.writeFile(path, JSON.stringify(usersFile));
    } catch (error) {
      return error;
    }
  }
}
