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

//router.get("/", (req, res, next) => {
  //axios.get(location.protocol + '//nominatim.openstreetmap.org/search?format=json&q='+"Koppenstraße 3, 10243 Berlin")
  //axios.get('https://nominatim.openstreetmap.org/search?<params>  ')
  //.then(response => {
  //  console.log("need to test api");
  //  console.log(response);
  //})
  //.catch(err => {
  //  console.log(err)
  //  })
//});


//axios.get(location.protocol + '//nominatim.openstreetmap.org/search?format=json&q='+"Koppenstraße 3, 10243 Berlin", function(data){
//  console.log(data);
//});

module.exports = router;
