const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const Player = require("../models/Player.js");

const getPlayerInfo = asyncHandler(async (req, res) => {
  const player = await Player.findById(req.params.id);
  if (!player) {
    res.status(StatusCodes.NOT_FOUND).json("Player not found");
    throw new Error("Player not found");
  }
  res.status(StatusCodes.OK).json(player);
});

const getPlayers = asyncHandler(async (req, res) => {
  const { nation: nationQuery } = req.query;
  const nation = nationQuery.toLowerCase();
  if (nation) {
    const playersByNation = await Player.find({ nation: nation });
    if (!playersByNation) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json("Cant find players from this nation" + nation);
      throw new Error("Cant find Players from nation:" + nation);
    }
    if (playersByNation.length === 0)
      res.status(StatusCodes.OK).json("No players in the database yet");
    return res.status(StatusCodes.OK).json(playersByNation);
  }
  const players = await Player.find().sort({ name: 1 });
  if (!players) {
    res.status(StatusCodes.NOT_FOUND).json("No players found");
    throw new Error("Players not found");
  }
  if (players.length === 0) {
    res.status(StatusCodes.OK).json("No players in the database yet");
  }

  return res.status(StatusCodes.OK).json(players);
});

const createPlayer = asyncHandler(async (req, res) => {
  const { name, nation, position, age } = req.body;
  if (!name || !nation || !position || !age) {
    res.status(StatusCodes.BAD_REQUEST).json("All fields must be filled");
    throw new Error("All fields must be filled");
  }

  if (
    typeof name !== "string" ||
    typeof nation !== "string" ||
    typeof position !== "string" ||
    typeof age !== "number"
  ) {
    res.status(StatusCodes.BAD_REQUEST).json("Invalid input values");
    throw new Error("Invalid request ");
  }

  const newPlayer = await Player.create({
    name,
    nation,
    position,
    age,
  });

  if (!newPlayer) {
    res.status(500).json("Something went wrong");
    throw new Error("Cant create player");
  }

  res
    .status(StatusCodes.OK)
    .json({ message: "Successfully created player", data: newPlayer });
});

const deletePlayer = asyncHandler(async (req, res) => {
  const player = await Player.findByIdAndDelete(req.params.id);
  if (!player) return res.status(StatusCodes.NOT_FOUND).json("Cant find player");
  res.status(StatusCodes.OK).json({ message: "Player deleted", data: player });
});

module.exports = { getPlayerInfo, getPlayers, createPlayer, deletePlayer };
