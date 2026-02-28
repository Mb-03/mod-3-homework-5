const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const playerRouter = require("./routes/playerRoutes.js");
const { StatusCodes } = require("http-status-codes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connect");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/api/players", playerRouter);

app.use((req, res, next) => {
  const error = new Error("Not found - " + req.originalUrl);
  error.status = StatusCodes.NOT_FOUND;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: err.message || "Internal Server Error",
    status: "error",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
