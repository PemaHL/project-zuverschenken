mapboxgl.accessToken = 'pk.eyJ1Ijoiam9hbm5ha3QiLCJhIjoiY2txcWZveDRzMDBpajJ2bm9vbnVwOTVwaCJ9.viWCugOjLMuoOcdVH-2ewg';
console.log(mapboxgl);
const map = new mapboxgl.Map({
	container: 'map', 
	style: 'mapbox://styles/joannakt/ckqqgjbik3ant17mn9epqpvcm', 
	center: [13.426, 52.531], 
	zoom: 9, 
});

let markers = [];
  axios.get('https://joy-luck-box.herokuapp.com/data')
          .then(response => {
               console.log("3 checking if axios is reading the object :", response.data.input);
               response.data.input.forEach(address => {
                   console.log("4 checking if axios is reading the address:", address);
				   axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}%20Germany.json?access_token=pk.eyJ1Ijoiam9hbm5ha3QiLCJhIjoiY2txcWZveDRzMDBpajJ2bm9vbnVwOTVwaCJ9.viWCugOjLMuoOcdVH-2ewg`)
                   //axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}%20Berlin%20Germany.json?access_token=pk.eyJ1Ijoiam9hbm5ha3QiLCJhIjoiY2txcWZveDRzMDBpajJ2bm9vbnVwOTVwaCJ9.viWCugOjLMuoOcdVH-2ewg')
                   //123%20Main%20St%20Boston%20MA
				  //axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/Kottbusser%20Damm%2072%2010967%20Berlin.json?access_token=pk.eyJ1Ijoiam9hbm5ha3QiLCJhIjoiY2txcWZveDRzMDBpajJ2bm9vbnVwOTVwaCJ9.viWCugOjLMuoOcdVH-2ewg')
				   .then(response=> {
                      // console.log("5 checking data returned by mapbox api:",response.data.features[1].geometry.coordinates);
					   console.log("5 checking data returned by mapbox api:",response.data);
                       markers.push(response.data.features[0].geometry.coordinates);
                        console.log("6 checking geo coordinates array:", markers);
						markers.forEach(coord => {
							new mapboxgl.Marker({
							color: 'blue'
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


