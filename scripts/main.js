// Our bundler automatically creates styling when imported in the main JS file!
import '../styles/style.css'
import { getData } from './data';
// import { map } from './d3';

const nlVenues = "&countryCode=NL";
const key = `uC0UADyMdASdYwjLJRHfjH8AjPzRlhFF`
const test = `https://app.ticketmaster.com/discovery/v2/venues?apikey=${key}&locale=*${nlVenues}`;
const countryEvents = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=${key}&locale=*&countryCode=NL";
// const musicEvents = `https://app.ticketmaster.com/discovery/v2/events.json?&classificationName=music&city=${city}&apikey=${key}`

import * as d3 from 'd3';
import * as L from 'leaflet';

// Lege array voor de markers van de locaties
let markersCity = [];

//IIFE async arrow
(async () => {
    getData(test).then((event) => {
        return event.map((e) => {
            // console.log(e?.location)
            markersCity.push(e?.location)
            return e?.location
        })
    })
})();

//Map maken voor leaflet en d3
let map = L.map('map', {
    map: 'Holland',
    center: [52.2129919, 5.2793703],  //center positie coords
    zoom: 7,
});


// Maak tiles aan voor de map, via openstreet 
L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    maxZoom: 16,
}).addTo(map);

L.svg().addTo(map);

d3.json(test)
    .then((data) => {
        return data._embedded.venues.map((vl) => {
            return {
                name: vl?.name,
                location: vl?.location,
                address: {
                    address: vl?.address,
                    city: vl?.city.name,
                    country: vl?.country,
                    state: vl?.state
                }
            }
        })
    })
    .then(data => {
        // return data
        d3.select("#map")
            .select("svg")
            .selectAll("myCircles")
            .data(data)
            .join("circle")
            .attr("cx", d => map.latLngToLayerPoint([d.location.latitude, d.location.longitude]).x)
            .attr("cy", d => map.latLngToLayerPoint([d.location.latitude, d.location.longitude]).y)
            .attr("r", 14)
            .style("fill", "red")
            .attr("stroke", "red")
            .attr("stroke-width", 3)
            .attr("fill-opacity", .4)
    })

async function createGraph() {
    // console.log(await markersCity)
    //select svg area, add circles
    d3.select("#map")
        .select("svg")
        .selectAll("myCircles")
        .data(await markersCity)
        .join("circle")
        .attr("cx", d => map.latLngToLayerPoint([d.latitude, d.longitude]).x)
        .attr("cy", d => map.latLngToLayerPoint([d.latitude, d.longitude]).y)
        .attr("r", 14)
        .style("fill", "red")
        .attr("stroke", "red")
        .attr("stroke-width", 3)
        .attr("fill-opacity", .4)
}

async function update() {
    d3.selectAll("circle")
        .attr("cx", d => map.latLngToLayerPoint([d.latitude, d.longitude]).x)
        .attr("cy", d => map.latLngToLayerPoint([d.latitude, d.longitude]).y)
}
// If the user change the map (zoom or drag), I update circle position:
map.on("moveend", update)

createGraph()

export { test, nlVenues, countryEvents }