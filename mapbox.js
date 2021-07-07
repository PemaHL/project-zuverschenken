// this will be placed in public folder where script.js is located 
//<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
const { default: axios } = require("axios");

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9hbm5ha3QiLCJhIjoiY2txcWZveDRzMDBpajJ2bm9vbnVwOTVwaCJ9.viWCugOjLMuoOcdVH-2ewg';

const map = new mapboxgl.Map({
	container: 'map', 
	style: 'mapbox://styles/joannakt/ckqqgjbik3ant17mn9epqpvcm', 
	center: [13.426, 52.531], 
	zoom: 9, 
});

let markers = [];
axios.get('http://localhost:3000/index')
        .then(response => {
            console.log(response);
            response.boxesList.address.forEach(postalCode => {
                //console.log(postalCode);
                axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoiam9hbm5ha3QiLCJhIjoiY2txcWZveDRzMDBpajJ2bm9vbnVwOTVwaCJ9.viWCugOjLMuoOcdVH-2ewg')
                .then(response=> {
                    //console.log(response.data.features[0].geometry.coordinates);
                    markers.push(response.data.features[0].geometry.coordinates);
					//not sure if .data need to be renamed, since I cannot see the output yet
                    console.log(markers);
                    markers.forEach(coord => {
                        new mapboxgl.Marker({
                            color: 'red'
                        })
                        .setLngLat(coord)
                        .addTo(map)
                    })  
                })
            })          
        })
        .catch(err => {
            console.log(err);
        })



const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

// When the user clicks on <div>, open the popup
function myFunction() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}
