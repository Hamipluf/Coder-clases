import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import UserManager from "../dao/mongoManager/UsersManager.js";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import { hashPassword, comparePasswords } from "../utils.js";
import { userModel } from "../dao/models/user.model.js";

const userManager = new UserManager();
const jwtSecret = process.env.SECRET_JWT;

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const userDB = await userManager.getUserByEmail(email);
        if (userDB) {
          return done(null, false); // ya existe el user se tendria que loguear
        }
        const hashPass = await hashPassword(password);
        const newUser = {
          ...req.body,
          password: hashPass,
        };
        const newUserDB = await userManager.createUser(newUser);
        done(null, newUserDB);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const userDB = await userManager.getUserByEmail(email);
        if (!userDB) return done(null, false); // No existe en la database hay que registrarse
        const comparePass = await comparePasswords(password, userDB.password);
        if (!comparePass) return done(null, false); // los password no son iguales
        done(null, userDB);
      } catch (error) {
        done(error);
      }
    }
  )
);

const extactFromCookie = (req) => {
  console.log(req);
  let token = null;
  if (req && req.signedCookies) token = req.signedCookies["token"];
  return token;
};

passport.use(
  "jwtCookies",
  new jwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([extactFromCookie]),
      secretOrKey: jwtSecret,
    },
    async (jwt_payload, done) => {
      done(null, jwt_payload.user);
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
