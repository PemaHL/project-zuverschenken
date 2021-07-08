const { Schema, model } = require("mongoose");

const boxSchema = new Schema({
  name: String,
  description: String,
  address: String
});

//this will add createdAt and updatedAt timestamps
//boxSchema.set('timestamps', true);

//This part is commented out at the moment, as it seems like the data deletion happens faster than 24hr
//boxSchema.index({updatedAt: 1}, {expireAfterSeconds: 86400});

const Box = model("Box", boxSchema);

module.exports = Box;
