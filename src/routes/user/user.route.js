const express = require("express");

const userRouter = express.Router();

const { httpCreateProfile, httpGetProfile } = require("./user.controller");

userRouter.get("/", httpGetProfile);
userRouter.post("/", httpCreateProfile);

module.exports = userRouter;
