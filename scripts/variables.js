/**
 * url link and all variables
 */
const urlData = "/scripts/exV2.json";

 //Map maken voor leaflet en d3
 let map = L.map("map", {
    map: "Holland",
    center: [52.2129919, 5.2793703], //center positie coords
    zoom: 7,
});

// Lege array voor de markers van de locaties
let markersCity = [];

export{urlData, map, markersCity}