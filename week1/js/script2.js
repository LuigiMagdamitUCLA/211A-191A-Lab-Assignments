// JavaScript const variable declaration
const map = L.map('map2').setView([40.712216, -74.22655], 11);

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//JavaScript let variable declaration to create a marker


        var imageUrl = 'https://m.media-amazon.com/images/M/MV5BZjJhMThkNTQtNjkxNy00MDdjLTg4MWQtMTI2MmQ3MDVmODUzXkEyXkFqcGdeQXVyMTAwOTA3NzY3._V1_.jpg',
        imageBounds = [[40.712216, -74.22655], [40.773941, -74.12544]];
    
    L.imageOverlay(imageUrl, imageBounds).addTo(map);

// Leaflet tile layer, i.e. the base map


//JavaScript let variable declaration to create a marker

