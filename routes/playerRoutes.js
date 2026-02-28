const express = require("express");
const Player = require("../models/Player.js");
const {
  getPlayerInfo,
  getPlayers,
  createPlayer,
  deletePlayer,
} = require("../controllers/playerControllers.js");

const { protected, isAdmin } = require("../middlewares/checkAdmin.js");

const playerRouter = express.Router();

playerRouter.get("/about/:id", getPlayerInfo);
playerRouter.get("/players", getPlayers);
playerRouter.post("/players", createPlayer);

playerRouter.delete("/players/:id", protected, isAdmin, deletePlayer);

module.exports = playerRouter;
