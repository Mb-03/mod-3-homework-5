const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    nation: { type: String, required: [true, "Nation is required"] },
    position: { type: String, required: [true, "Position is required"] },
    age: { type: Number, required: [true, "Age is required"] },
  },
  { timestamps: true },
);

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
