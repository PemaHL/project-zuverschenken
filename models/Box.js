const { Schema, model } = require("mongoose");

const boxSchema = new Schema({
  name: String,
  description: String,
  address: String
});

//this will add createdAt and updatedAt timestamps
boxSchema.set('timestamps', true);

boxSchema.index({updatedAt: 1}, {expireAfterSeconds: 86400});

const Box = model("Box", boxSchema);

module.exports = Box;
