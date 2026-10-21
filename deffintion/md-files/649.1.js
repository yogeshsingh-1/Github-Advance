import pino from "pino";

const logger = pino();

logger.info({ name: "Kaushik", age: 15 }, "Hi, how are you?");
logger.error({ name: "Kaushik", age: 15 }, "Hi, how are you?");
