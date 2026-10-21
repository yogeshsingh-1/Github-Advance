import pino from "pino";

const transport = pino.transport({
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
        destination: "./pretty.log",
        colorize: false,
        translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
      },
    },
  ],
});

const logger = pino({}, transport);

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

try {
  console.log(object);
} catch (err) {
  logger.error(err, "some error occurred");
}
