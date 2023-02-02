
// We can use node_modules directely in the browser!
import * as d3 from 'd3';
import { max, min } from 'd3';
import * as L from 'leaflet';
import { getData } from './data';
import { test } from '../main';


let map = L.map('map', {
    map: 'Holland',
    center: [47, 2],  //center positie coords
    zoom: 5,
});
L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    maxZoom: 5,
}).addTo(map);

L.svg().addTo(map);

let markersCity = [];

async function createGraph() {
    console.log(await getData(test).location)
    //select svg area, add circles
    d3.select("#map")
        .select("svg")
        .selectAll("myCircles")
        .data(await getData(test))

}



export { map, createGraph }