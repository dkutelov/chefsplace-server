const http = require("http");
require("dotenv").config();

const { mongoConnect } = require("./services/mongo");

const PORT = process.env.PORT;

const app = require("./app");
const { saveProduct } = require("./models/products/products.model");
const server = http.createServer(app);

//const { product } = require("../productUpload1.json");
async function startServer() {
  await mongoConnect();

  //await saveProduct(product);
  server.listen(PORT, () => {
    console.log(`🚀 Listening on port: ${PORT} ...`);
  });
}

startServer();
