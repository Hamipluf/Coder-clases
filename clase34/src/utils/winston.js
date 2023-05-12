import winston from "winston";
import dotenv from "dotenv";
dotenv.config();
const entorno = process.env.NODE_ENV;
const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "black",
    error: "red",
    warning: "magenta",
    info: "cyan",
    http: "green",
    debug: "blue",
  },
};

let Logger;
if (entorno === "desarrollo") {
   Logger = winston.createLogger({
    levels: customLevels.levels,
    transports: [
      new winston.transports.Console({
        level: "debug",
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        ),
      }),
    ],
  });
}
if (entorno === "produccion") {
  Logger = winston.createLogger({
    levels: customLevels.levels,
    transports: [
      new winston.transports.File({
        level: "error",
        filename: "error.log",
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.prettyPrint()
        ),
      }),
    ],
  });
}

export default Logger;
