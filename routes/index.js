const router = require("express").Router();
const Box = require('../models/Box');
const User = require('../models/User.model');
// const axios = require('axios');

/* GET home page */
//the homepage should show all boxes on the map - this need to be added - done
//how would we know the location of the box?

//original code before playing with axios & api
// router.get("/", (req, res, next) => {
//   console.log("testing homepage");
//   Box.find()
//       .then(boxesList => {
//         res.render("index", {boxesList});
//       })
//       .catch(err => {
//         console.log(err)
//       })
// });
router.get("/", (req, res, next) => {
  console.log("1 testing homepage");
  Box.find()
      .then(boxesList => {
       // boxesListData.push(boxesList);
       // console.log("2 checking if box data is pushed to new object:", boxesListData)
        res.render("index", {boxesList});
        //console.log("checking to retrieve address", boxesList.address)
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
//console.log("checking if box data is pushed to new object:", boxesListData)

  


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
