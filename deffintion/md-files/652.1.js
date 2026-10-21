import pino from "pino";

const logger = pino({
  transport: {
    targets: [
      {
        target: "pino/file",
        options: {
          destination: "./app.log",
          mkdir: true,
        },
      },
      {
        // target: "pino/file",
        target: "pino-pretty",
        options: {
          destination: 1,
          colorize: true,
          translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
        },
      },
    ],
  },
  redact: {
    paths: ["password", "address.pincode"],
    remove: true,
  },
});

logger.info(
  {
    username: "Kaushik",
    age: 10,
    email: "kaushik@gmail.com",
    password: "kaushik@123",
    address: {
      city: "Delhi",
      pincode: 209348,
    },
  },
  "Kaushik user",
);
