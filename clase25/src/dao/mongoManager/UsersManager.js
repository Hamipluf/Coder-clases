import { userModel } from "../models/user.model.js";
import { comparePasswords } from "../../utils.js";
export default class UserManager {
  // Obtiene todos los usuarios
  async getAllUsers() {
    try {
      const users = await userModel.find();
      return users;
    } catch (error) {
      console.log("ERROR getAllUsers", error);
      throw new Error({
        status: "error",
        message: "No hay users o no se pudo acceder a la base de datos",
      });
    }
  }
  async getUserByEmail(email) {
    if (!email) {
      return null; // throw new Error() q seria bloqueante
    }
    try {
      const user = await userModel.findOne({ email });
      return user;
    } catch (error) {
      console.log("ERROR getUserById", error);
    }
  }
  async createUser(user) {
    const { first_name, last_name, age, email, password } = user;
    if (!first_name || !last_name || !age || !email || !password) {
      return null; // throw new Error() q seria bloqueante
    }
    try {
      const createUser = await userModel.create({
        first_name,
        last_name,
        age,
        email,
        password,
      });
      return createUser;
    } catch (error) {
      console.log("ERROR createUser", error);
      throw new Error("No se pudo crear el usuario");
    }
  }
  async loginUser(user) {
    const { email, password } = user;
    try {
      const user = await userModel.findOne({ email });
      if (user) {
        const isPassword = await comparePasswords(password, user.password);
        console.log(isPassword);
        if (isPassword) {
          return user;
        }
      }
      return null;
    } catch (error) {
      console.log("ERROR loginUser", error);
      throw new Error("No se pudo encontrar el usuario");
    }
  }
}
