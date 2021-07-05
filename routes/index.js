const router = require("express").Router();
const Box = require('../models/Box');
const User = require('../models/User');

/* GET home page */
//the homepage should show all boxes on the map - this need to be added - done
//how would we know the location of the box?

router.get("/", (req, res, next) => {
  console.log("testing homepage");
  Box.find()
      .then(boxInDB => {
        res.render("index", {boxInDB});
      })
      .catch(err => {
        console.log(err)
      })
});

module.exports = router;
