import { Router } from "express";
import passport from "passport";

import UserManager from "../dao/mongoManager/UsersManager.js";
const router = Router();
const User = new UserManager();
// Recupero todos los users
router.get("/", async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.status(200).json({
      status: "Successfull",
      data: users,
    });
  } catch (error) {
    console.log("ERROR getAllUsers GET", error);
    res.status(500).json({
      status: "Error",
      message: "El archivo no existe o no se puede leer la DB",
    });
  }
});
// Destruye la session
router.get("/user/logout", (req, res) => {
  try {
    req.session.destroy((error) => {
      if (error) {
        res.status(400).send({
          status: "Error",
          message: "No se pudo borrar la sesión",
        });
      } else {
        res.status(200).send({
          status: "Successful",
          message: "Se ha borrado la sesión",
        });
      }
    });
  } catch (error) {
    console.log("ERROR EN USER LOGOUNT GET", error);
    res.status(500).send({
      status: "Error",
      message: "Error en destruir la sesion",
    });
  }
});
// Mando los datos de session al perfil
router.get("/profile", (req, res) => {
  const { firstName, lastName, email } = req.session;
  const user = {
    firstName,
    lastName,
    email,
  };
  res.status(200).send({
    status: "Successful",
    data: user,
  });
});
// LOGIN CON GITHUB
router.get(
  "/login/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get("/github", passport.authenticate("github"), (req, res) => {
  req.session.firstName = req.user.firstName;
  req.session.lastName = req.user.lastName;
  req.session.email = req.user.email;
  res.redirect("/profile");
});

//registro con passport
router.post(
  "/registro",
  passport.authenticate("registro", {
    failureRedirect: "/errorRegistro",
    passReqToCallback: true,
  }),
  (req, res) => {
    const { firstName, lastName, email } = req.body;
    (req.session.firstName = firstName),
      (req.session.lastName = lastName),
      (req.session.email = email),
      res.redirect("/home");
  }
);
// Loguea al user con email y password, ademas de verificar el rod del amdministrador del sitio web
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.loginUser(req.body);
    if (req.session.email) {
      res.redirect("/profile");
    }
    if (user) {
      req.session.email = user.email;
      req.session.firstName = user.firstName;
      req.session.lastName = user.lastName;
      req.session.age = user.age;
      // Verificacion de coed admin
      if (email === "adminCoder@mail.com" && password === "12345") {
        req.session.isAdmin = true;
      } else {
        req.session.isAdmin = false;
      }
      const userData = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
      };
      res.cookie("user", userData, { maxAge: 3600000 });
      res.status(200).json({
        status: "Successful",
        data: userData,
      });
    } else {
      res.status(400).json({
        status: "Error",
        message: "Datos incorrectos",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "No se pudo autenticar",
    });
  }
});

export default router;
