// this will be placed in public folder where script.js is located 

// const { default: axios } = require('axios');
mapboxgl.accessToken = 'pk.eyJ1Ijoiam9hbm5ha3QiLCJhIjoiY2txcWZveDRzMDBpajJ2bm9vbnVwOTVwaCJ9.viWCugOjLMuoOcdVH-2ewg';
console.log(mapboxgl);
const map = new mapboxgl.Map({
	container: 'map', 
	style: 'mapbox://styles/joannakt/ckqqgjbik3ant17mn9epqpvcm', 
	center: [13.426, 52.531], 
	zoom: 9, 
});

// let testAdd ='Koppenstraße 3, 10243 Berlin'
// let testOutput = {};
// axios.get(testAdd)
//     .then(response => {
//         console.log("Checking address:", testAdd)
//         testOutput.push(axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${testAdd}.json?access_token=pk.eyJ1Ijoiam9hbm5ha3QiLCJhIjoiY2txcWZveDRzMDBpajJ2bm9vbnVwOTVwaCJ9.viWCugOjLMuoOcdVH-2ewg`))
//         console.log("Checking mapbox API:", testOutput)
//     })

const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');


// When the user clicks on <div>, open the popup
function myFunction() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}


