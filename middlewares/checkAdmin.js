const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

const protected = asyncHandler(async (req, res, next) => {
  let token;
  if (!req.headers.authorization) {
    res.status(StatusCodes.UNAUTHORIZED);
    throw new Error("No token found");
  }

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT);
      req.user = await User.findById(decoded.id);
      next();
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.UNAUTHORIZED);
      throw new Error("Not Authorized");
    }
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  res.status(StatusCodes.FORBIDDEN);
  throw new Error("Not Authorized");
});

module.exports = { protected, isAdmin };
