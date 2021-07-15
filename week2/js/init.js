coords = [34.0709, -118.444];
zoom = 5;
let data = {
    "coords": [0, 0],
    "zoom": 5
}
const myMap = L.map('mapArea').setView(data.coords, data.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// adding markers

function addMarker(latitude, longitude, message, caption){
    L.marker([latitude, longitude]).addTo(myMap).bindPopup(caption)
    createButtons(latitude, longitude, message)
}
function addMarkerImage(latitude, longitude, message, caption){
    L.marker([latitude, longitude]).addTo(myMap).bindPopup(caption)
    createImageButtons(latitude, longitude, "https://i.redd.it/duk74akvjea61.jpg")
}
function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        myMap.flyTo([lat,lng]); //this is the flyTo from Leaflet but using "myMap" as the target
    })
    document.body.appendChild(newButton); //this adds the button to our page.
}
function createImageButtons(lat,lng,title, src){
    const newButton = document.createElement("img"); // adds a new button
    newButton.id = "image"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title

    newButton.src = "https://preview.redd.it/u3q5x41167i11.png?auto=webp&s=b52829b5546565b182ba9360711bbd9bc1f84b12"
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.setAttribute("src","https://i.pinimg.com/564x/a5/96/d4/a596d41556ed42f03fe5e0d8b27ceeb8.jpg"); // sets the longitude 
    newButton.addEventListener('click', function(){
        myMap.flyTo([lat,lng]); //this is the flyTo from Leaflet but using "myMap" as the target
    })
    document.body.appendChild(newButton); //this adds the button to our page.
}

function addText(message){
    const newText = document.createElement("h1")
    newText.innerHTML = message
    document.body.appendChild(newText);
}
addText("you have to scroll down hehe (also click the image :D)")
addMarker(50.8195, 2.9257, "All along the Western front", "People line up to receive")
addMarker(2.163106, -55.126648, "Saw her in the amazon", "With the voltage running through her skin")
addMarker(40.7128, -74.0060, "All along the Eastern shore", "Put your circuits in the sea")
addMarkerImage(34.0700, -118.4398, "Clown College", "Clown College(ucla)")

var imageUrl = 'https://m.media-amazon.com/images/M/MV5BZjJhMThkNTQtNjkxNy00MDdjLTg4MWQtMTI2MmQ3MDVmODUzXkEyXkFqcGdeQXVyMTAwOTA3NzY3._V1_.jpg',
imageBounds = [data.coords, data.coords];
L.videoOverlay(imageUrl, imageBounds ).addTo(map);