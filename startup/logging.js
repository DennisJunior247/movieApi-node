const { createLogger, format, transports, config } = require("winston");
require("winston-mongodb");
require("express-async-errors");

const logger = createLogger({
  level: "info",
  format: format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new transports.File({ filename: " logfile.log" }),

    new transports.MongoDB({
      db: "mongodb://localhost/nmovieApi",
      level: "info",
      options: {
        useUnifiedTopology: true,
      },
    }),
  ],
  exceptionHandlers: [new transports.File({ filename: "exceptions.log" })],

  rejectionHandlers: [new transports.File({ filename: "rejections.log" })],
});


  logger.add(
    new transports.Console({
      colorize: true,
      prettyPrint: true,
      format: format.simple(),
    })
  );


module.exports.logger = logger;

// process.on("unhandledRejection", (ex) => {
//   throw ex;
// });

// winston.handleExceptions(
//   new winston.transports.File({ filename: "uncaughtExceptions.log" }),
//   new winston.transports.Console({ colorize: true, prettyPrint: true })
// );

// winston.add(winston.transports.File, { filename: "logfile.log" });
// winston.add(winston.transports.MongoDB, {
//   db: "mongodb://localhost/vidly",
//   level: "info",
// });
