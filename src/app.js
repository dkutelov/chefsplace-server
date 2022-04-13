const express = require("express");
const path = require("path");
const morgan = require("morgan");

const api = require("./routes/api");

const app = express();

app.use(morgan("combined"));

app.use(express.json());
app.use("/v1", api);

module.exports = app;
