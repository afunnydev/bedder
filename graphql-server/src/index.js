require("dotenv").config({ path: "variables.env" });
const createServer = require("./createServer");

const server = createServer();

const port = process.env.PORT || 4000;

server.listen({ port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
