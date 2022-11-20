/* 
Helper functions that helps to create the application
*/

// Get Longitude and Latitude from user's browser and return an array with the coordinates
function getCoordinates() {
    var coordinates = [];
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            coordinates.push(position.coords.longitude);
            coordinates.push(position.coords.latitude);
        });
    }
    console.log(`helper:getCoordinates`, coordinates)
    return coordinates;
}

export { getCoordinates }