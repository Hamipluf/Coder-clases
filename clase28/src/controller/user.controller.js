import { generateToken } from "../utils.js";

import UserManager from "../dao/mongoManager/UsersManager.js";
const User = new UserManager();

export const registerUser = (req, res) => {
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
};
export const loginUser = async (req, res) => {
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
};
export const logoutUser = async (req, res) => {
  try {
    if (!req.cookies) {
      res.send({ message: "No se pudo salir de la session", status: false });
    }
    res.clearCookie("token").send({ message: "Logout correcto", status: true });
  } catch (error) {
    console.log(error);
  }
};
