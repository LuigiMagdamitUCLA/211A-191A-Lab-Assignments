// JavaScript const variable declaration
const map = L.map('map').setView([34.0709, -118.444], 15);

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//JavaScript let variable declaration to create a marker
let marker = L.marker([33.875671, -117.568840]).addTo(map)
		.bindPopup('lololol')
		.openPopup();