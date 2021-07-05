const { Schema, model } = require("mongoose");

const boxSchema = new Schema({
  name: String,
  description: String,
  timestamps.createdAt,
  timestamps.updatedAt
});

const Box = model("Box", boxSchema);

module.exports = Box;
