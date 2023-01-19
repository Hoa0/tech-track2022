import "../styles/style.css";
import * as d3 from "d3";
import * as L from "leaflet";
import { getData } from "./data";
import { getCoordinates } from "./helpers";

//Map maken voor leaflet en d3
let map = L.map("map", {
    map: "Holland",
    center: [52.2129919, 5.2793703], //center positie coords
    zoom: 7,
});

// Maak tiles aan voor de map, via openstreet
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    maxZoom: 16,
}).addTo(map);

L.svg().addTo(map);

getData("/scripts/exV2.json")
    .then((data) => {
        console.log(data);
        return data._embedded.events.map((vl) => {
            //console.log(vl);
            let option = document.createElement("option");
            option.value = vl?.id;
            option.innerHTML = vl?.name;
            document.querySelector('#eventSelect').appendChild(option)
            return {
                genre: {
                    genres: vl?.classifications,
                },
                name: vl?.name,
                location: {
                    coords: vl?._embedded.venues[0].location,
                    city: vl?._embedded.venues[0].city.name,
                    country: vl?._embedded.venues[0].country.name,
                    name: vl?._embedded.venues[0].name,
                    postal: vl?._embedded.venues[0].postalCode,
                },
            };
        });
    })
    .then((data) => {
        console.log(data);
        return data;
    })
    .then((data) => {
        // return data
        d3.select("#map")
            .select("svg")
            .selectAll("myCircles")
            .data(data)
            .join("circle")
            .attr(
                "cx",
                (d) =>
                    map.latLngToLayerPoint([d.location.coords.latitude, d.location.coords.longitude]).x
            )
            .attr(
                "cy",
                (d) =>
                    map.latLngToLayerPoint([d.location.coords.latitude, d.location.coords.longitude]).y
            )
            .attr("r", 14)
            .style("fill", "red")
            .attr("stroke", "red")
            .attr("stroke-width", 3)
            .attr("fill-opacity", .4)
    });

async function createGraph() {
    // console.log(await markersCity)
    //select svg area, add circles
    d3.select("#map")
        .select("svg")
        .selectAll("myCircles")
        .data(await markersCity)
        .join("circle")
        .attr("cx", (d) => map.latLngToLayerPoint([d.latitude, d.longitude]).x)
        .attr("cy", (d) => map.latLngToLayerPoint([d.latitude, d.longitude]).y)
        .attr("r", 14)
        .style("fill", "red")
        .attr("stroke", "red")
        .attr("stroke-width", 3)
        .attr("fill-opacity", 0.4);
}

async function update() {
    d3.selectAll("circle")
        // longLat data ophalen van data.location
        .attr(
            "cx",
            (d) =>
                map.latLngToLayerPoint([d?.location.coords.latitude, d?.location.coords.longitude]).x
        )
        .attr(
            "cy",
            (d) =>
                map.latLngToLayerPoint([d?.location.coords.latitude, d?.location.coords.longitude]).y
        );
}
// If the user change the map (zoom or drag), I update circle position:
map.on("moveend", update);

// Lege array voor de markers van de locaties
let markersCity = [];

// IIFE async arrow
(async () => {
    getData("/scripts/exV2.json")
        .then((event) => {
            // Juiste event data ophalen, ipv alleen event. daar binnen in heb ik de venues van nodig
            let dataElement = event?._embedded?.events;

            return dataElement.map((e) => {
                // console.log(e?.location)
                //  console.log(e)
                markersCity.push(e?._embedded.venues.location);
                return e?._embedded.venues.location;
            });
        })
        .then((event) => {
            // console.log(event)
        })
    document
        .querySelector(".btn--location")
        .addEventListener("click", (event) => {
            // console.log(event)
            getCoordinates();
            updateLocation(getCoordinates());
        });
})();

d3.select('#eventSelect')
    .on('change', function () {
        let getVenueId = d3.select(this).property('value')
        console.log(getVenueId)
        let prom = getData("/scripts/exV2.json").then((res) => {
            //return res._embedded.events
            //return res._embedded.venues
            //return res._embedded.events.classifications.segment
            return res._embedded.venues
        })
        Promise.resolve(prom).then((value) => {
            value.map((event) => {
                console.dir(event)
                return event
            })
            // console.log("hii", value)
        })
    })

createGraph();