const { Schema, model } = require("mongoose");

const boxSchema = new Schema({
  name: String,
  description: String,
  address: String
});

//this will add createdAt and updatedAt timestamps
boxSchema.set('timestamps', true);

const Box = model("Box", boxSchema);

module.exports = Box;
