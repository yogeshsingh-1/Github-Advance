import pino from "pino";

const logger = pino({
  transport: {
    targets: [
      {
        target: "pino/file",
        options: {
          destination: "./logs/app.log",
          mkdir: true,
        },
      },
      {
        target: "pino-pretty",
        options: {
          destination: 1,
          translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
        },
      },
    ],
  },
});

export default logger;
