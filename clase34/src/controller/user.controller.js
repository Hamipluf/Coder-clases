import usersServices from "../services/users.services.js";
import { generateToken } from "../utils/jwt.js";
import Logger from "../utils/winston.js";
export const registerUser = (req, res) => {
  const user = req.user;
  console.log(user);

  try {
    if (user.status === "Error") {
      res.status(404).send({ message: user.message });
    }
    const token = generateToken(user);
    res
      .cookie("token", token, {
        httpOnly: true,
        signed: true,
        maxAge: 3600000,
      })
      .json({ message: "User creado con exito", token });
  } catch (error) {
    Logger.error("controller registerUser", error);
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
    Logger.error("controller loginUser", error);
    res.status(500).json({ message: "Error al loguear usuario" });
  }
};

export const getCurrentUser = (req, res) => {
  const { user } = req;
  if (!user) {
    res
      .status(404)
      .json({ status: "Error", message: "Se necesita autenticar el usuario" });
  }
  const userResponse = {
    id: user.id,
    fullName: `${user.first_name + " " + user.last_name}`,
    age: user.age,
    email: user.email,
    role: user.role,
  };
  res.json({ status: "Successful", userResponse });
};
export const getUserWithEmail = async (req, res) => {
  try {
    const user = await usersServices.getUserWithEmail(req.body);
    return user;
  } catch (error) {
    Logger.error("controller getUserWithEmail", error);
    const response = `No existe ningun usuario con es Email ${error}`;
    return response;
  }
};
export const logoutUser = async (req, res) => {
  try {
    if (!req.cookies) {
      res.send({ message: "No se pudo salir de la session", status: false });
    }
    res.clearCookie("token").send({ message: "Logout correcto", status: true });
  } catch (error) {
    Logger.error("controller logoutUser", error);
  }
};
