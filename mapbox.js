// this will be placed in public folder where script.js is located 

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9hbm5ha3QiLCJhIjoiY2txcWZveDRzMDBpajJ2bm9vbnVwOTVwaCJ9.viWCugOjLMuoOcdVH-2ewg';

const map = new mapboxgl.Map({
	container: 'map', 
	style: 'mapbox://styles/joannakt/ckqqgjbik3ant17mn9epqpvcm', 
	center: [13.426, 52.531], 
	zoom: 9, 
});

const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

