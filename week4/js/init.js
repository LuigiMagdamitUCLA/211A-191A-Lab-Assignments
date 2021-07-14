const myMap = L.map('mapArea').setView([34.0709, -118.444], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let url = "https://spreadsheets.google.com/feeds/list/1wKSyUz0z_iUbkwxHRME-shID4q9mNWqiKXjyl2w5lgs/oyn3kvk/public/values?alt=json"
fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{
        console.log(data)
        processData(data)
    })

function generatePost(year = 1, eth = "Filipino", score1 = 0, score2 = 0, story = "", misc = "") {
    let html_element = `
    <h2>Year: ${year} </h2>
    <h3>Ethnicity: ${eth}</h3>
    <h3>How would you rate your safety prior to COVID-19 era? ${score1}</h3>
    <h3>How would you rate your safety after/during COVID-19 era? ${score2}</h3>
    <h4>My Story</h4>
    <p>${story}</p>

    <h4>Is there anything else you want to share?</h4>
    <p>${misc}</p>
    `
    return html_element
}
function addMarker(data){
        //L.marker([data.lat,data.lng]).addTo(myMap).bindPopup(`<h2>${data.location}</h2>`)
        L.marker([data.lat,data.lng]).addTo(myMap).bindPopup(
            generatePost(
                year = data.year,
                eth = data.ethnicity,
                score1 = data.score1,
                score2 = data.score2,
                story = data.story,
                misc = data.misc
            )
        )
        return data.location   
}

function processData(theData){
    const formattedData = [] /* this array will eventually be populated with the contents of the spreadsheet's rows */
    const rows = theData.feed.entry // this is the weird Google Sheet API format we will be removing
    // we start a for..of.. loop here 
    for(const row of rows) { 
      const formattedRow = {}
      for(const key in row) {
        // time to get rid of the weird gsx$ format...
        if(key.startsWith("gsx$")) {
              formattedRow[key.replace("gsx$", "")] = row[key].$t
        }
      }
      // add the clean data
      formattedData.push(formattedRow)
    }
    // lets see what the data looks like when its clean!
    console.log(formattedData)
    // we can actually add functions here too
    formattedData.forEach(addMarker)
}


