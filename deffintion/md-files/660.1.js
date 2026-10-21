import pino from "pino";

const logger = pino({
  transport: {
    targets: [
      {
        target: "pino-loki",
        options: {
          host: "http://localhost:3100",
          labels: {
            app: "express-app",
          },
        },
      },
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
