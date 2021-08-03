const myMap = L.map('mapArea').setView([34.0709, -118.444], 5);

const url = "https://spreadsheets.google.com/feeds/list/1upD99bKWIO68jL8MKWV67KE-_H_TVn2bCwqyQkqNsBw/oxw5dh3/public/values?alt=json"

let Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
	maxZoom: 16
});

Esri_WorldGrayCanvas.addTo(myMap)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{
                // console.log(data)
                formatData(data)
        }
)


let circleOptions = {
    radius: 4,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
}


function addMarker(data){
    if(data.doyouspeakenglishfluently == "Yes"){
        circleOptions.fillColor = "Blue";
        z.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>Speak English fluently</h2>`))
        createButtons(data.lat,data.lng,data.location)
        }
    else{
        circleOptions.fillColor = "Red";
        speakOtherLanguage.addLayer(L.marker([data.lat,data.lng],circleOptions).bindPopup(`<h2>Speak other languages</h2>`))
        createButtons(data.lat,data.lng,data.location)
    }
    return data.timestamp
}
// let speakOtherLanguage = 0
//window.onload = function afterWebPageLoad() { 
    //document.body.append("Number of hidden records:"+speakOtherLanguage)

function createButtons(lat,lng,title){
    const newButton = document.createElement("button");
    newButton.id = "button"+title;
    newButton.innerHTML = title;
    newButton.setAttribute("lat",lat); 
    newButton.setAttribute("lng",lng);
    newButton.addEventListener('click', function(){
        myMap.flyTo([lat,lng]);
    })
    const spaceForButtons = document.getElementById('contents')
    spaceForButtons.appendChild(newButton);
}

function formatData(theData){
    const formattedData = []
    const rows = theData.feed.entry
    for(const row of rows) {
      const formattedRow = {}
      for(const key in row) {
        if(key.startsWith("gsx$")) {
              formattedRow[key.replace("gsx$", "")] = row[key].$t
        }
      }
      formattedData.push(formattedRow)
    }
    console.log(formattedData)
    formattedData.forEach(addMarker)
    //z.addTo(myMap) // add our layers after markers have been made
    //speakOtherLanguage.addTo(myMap) // add our layers after markers have been made  
}


// our Leaflet feature group layers waiting for content!
let z = L.markerClusterGroup();
let speakOtherLanguage = L.markerClusterGroup();


z.addTo(myMap)
speakOtherLanguage.addTo(myMap)

// define layers
let layers = {
	"Speaks English": z,
	"Speaks Other Languages": speakOtherLanguage
}

// add layer control box
L.control.layers(null,layers).addTo(myMap)

// make the map zoom to the extent of markers
myMap.fitBounds(speakOtherLanguage.getBounds());

let allLayers = L.featureGroup([z,speakOtherLanguage]);
myMap.fitBounds(allLayers.getBounds());   