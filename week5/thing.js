function myFunction() {
    let sheet = SpreadsheetApp.getActiveSheet();
     
    let range = sheet.getDataRange();
    let cells = range.getValues();
     
    let latitudes = [['lat']];
    let longitudes = [['lng']];
     
    for (let i = 0; i < cells.length; i++) {
      // change cells[i][2] if your address is not in column 'C', for example cells[i][1] for column 'B' or cells[i][3] for column D
       addressColumn = cells[i][1] 
       let lat = lng = 0;
      if (i > 0) {
        if (addressColumn){
      let address = addressColumn;
      console.log(address)
   
      if(address){
        let geocoder = Maps.newGeocoder().geocode(address);
        let res = geocoder.results[0];
          if (res) {
            lat = res.geometry.location.lat;
            lng = res.geometry.location.lng;
          }
        }
      }
         latitudes.push([lat]);
      longitudes.push([lng]);
        }
    }
    sheet.getRange('C1') // this is the latitude column
    .offset(0, 0, latitudes.length)
    .setValues(latitudes);
    sheet.getRange('D1') // this is the longitude column
    .offset(0, 0, longitudes.length)
    .setValues(longitudes);
    Utilities.sleep(5000)
  }