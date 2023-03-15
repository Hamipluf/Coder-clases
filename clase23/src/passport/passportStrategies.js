import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import UserManager from "../dao/mongoManager/UsersManager.js";
import { userModel } from "../dao/models/user.model.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { hashPassword } from "../utils.js";
const userManager = new UserManager();
// LOCAL STRATEGY
passport.use(
  "registro",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password", // Propiedades de logueo
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await userModel.findOne({ email });
      if (user) {
        return done(null, false);
      }
      const hashNewPassword = await hashPassword(password);
      const newUser = { ...req.body, password: hashNewPassword };
      const newuserBD = await userManager.createUser(newUser);
      done(null, newuserBD);
    }
  )
);

// GITHUB STRATEGY
passport.use(
  "github",
  new GithubStrategy(
    {
      clientID: process.env.CLIENT_ID_GITHUB,
      clientSecret: process.env.CLIENT_SECRET_GITHUB,
      callbackURL: "http://localhost:8080/api/auth/github",
    },
    async (accessToken, refreshToken, profile, done) => {
      const userDB = await userModel.findOne({ email: profile._json.email });
      if (!userDB) {
        const gitUser = {
          firstName: profile._json.name.split(" ")[0],
          lastName: profile._json.name.split(" ")[1] || " ",
          email: profile._json.email || " ",
          password: " ",
          isGithub: true,
        };
        const newUser = await userModel.create(gitUser);
        done(null, newUser);
      } else {
        done(null, userDB);
      }
    }
  )
);

// Funciones obligatorias para que passport pueda encontrar y autenticar el user
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userModel.findById(id);
  done(null, user);
});
