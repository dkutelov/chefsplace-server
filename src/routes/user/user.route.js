const express = require("express");

const userRouter = express.Router();

const { httpCreateProfile } = require("./user.controller");

//userRouter.get("/", httpGetAllCategories);
userRouter.post("/", httpCreateProfile);

module.exports = userRouter;
