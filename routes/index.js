const router = require("express").Router();
const Box = require('../models/Box');
const User = require('../models/User.model');
const axios = require('axios');

/* GET home page */
//the homepage should show all boxes on the map - this need to be added - done
//how would we know the location of the box?

router.get("/", (req, res, next) => {
  console.log("testing homepage");
  Box.find()
      .then(boxesList => {
        res.render("index", {boxesList});
      })
      .catch(err => {
        console.log(err)
      })
});

//make a route for the data for axios
//let boxesListData = [];
router.get("/data", (req, res, next) => {
  Box.find()
      .then(boxesList => {
        //boxesListData.push(boxesList);
        //console.log("2 checking if box data is pushed to new object:", boxesListData)
        address = boxesList.map(e => encodeURI(e.address));
       // address = boxesList.map(e => encodeURIComponent(e.address));
       // address = boxesList.map(e => e.address);
        console.log("2 testing address:", address)
        res.json({input:address});
        //console.log("checking to retrieve address", boxesList.address)
      })
      .catch(err => {
        console.log(err)
      })
});

module.exports = router;
