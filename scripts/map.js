import * as L from "leaflet";

function displayMap(map) {
    // //Map maken voor leaflet en d3
    // let map = L.map("map", {
    //     map: "Holland",
    //     center: [52.2129919, 5.2793703], //center positie coords
    //     zoom: 7,
    // });

    // Maak tiles aan voor de map, via openstreet
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        maxZoom: 16,
    }).addTo(map);

    L.svg().addTo(map);
}

export { displayMap }