import Fastify from "fastify";

function buildApp() {
  const fastify = Fastify({
    logger: true,
  });

  // routes
  // fastify.addSchema({ $id: "one", my: "hello", email: "yogeshs368@gmail.com" });
  // will return only `one` schema
  fastify.get("/", (request, reply) => {
    return fastify.getSchemas();
  });
  const option = {
    body: {
      type: "object",
      properties: {
        someKey: { type: "string" },
        // someOtherKey: { type: "number" },
      },
    },
  };
  fastify.post("/",  (request, reply) => {
    // console.log(reply);
    // return reply.body;
    reply.send({ params: request.query, body: request.body });
  });

  return fastify;
}

async function start() {
  try {
    const app = buildApp();

    const PORT = Number(process.env.PORT) || 4000;

    await app.listen({
      port: PORT,
      host: "0.0.0.0",
    });

    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

start();
