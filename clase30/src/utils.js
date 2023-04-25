import { dirname } from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secretJwt = process.env.SECRET_JWT;

export const __dirname = dirname(fileURLToPath(import.meta.url));

export const generateToken = (user) => {
  const token = jwt.sign({ user }, secretJwt, { expiresIn: "1h" });
  return token;
};
export const hashData = async (password) => {
  return bcrypt.hash(password, 10);
};

export const compareData = async (password, passwordBD) => {
  return bcrypt.compare(password, passwordBD);
};
