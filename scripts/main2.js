import "../styles/style.css";
import * as d3 from "d3";
import * as L from "leaflet";
import { getData } from "./data";
import { getCoordinates } from "./helpers";

// //Map maken voor leaflet en d3
// let map = L.map("map", {
//     map: "Holland",
//     center: [52.2129919, 5.2793703], //center positie coords
//     zoom: 7,
// });

// // Maak tiles aan voor de map, via openstreet
// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     attribution:
//         'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
//     maxZoom: 16,
// }).addTo(map);

// L.svg().addTo(map);

// const cardsEvents = document.getElementById("cards-container")

// getData("/scripts/exV2.json")
//     .then((data) => {
//         // console.log(data);
//         return data._embedded.events.map((vl) => {
//           //  console.log(vl);
//             //genre laten zien in de dropdown
//             let option = document.createElement("option");
//             option.value = vl?.classifications[0]?.genre?.id;
//             option.innerHTML = vl?.classifications[0]?.genre?.name;
//             document.querySelector('#eventSelect').appendChild(option);

//             return {
//                 genre: {
//                     genres: vl?.classifications,
//                 },
//                 name: vl?.name,
//                 location: {
//                     coords: vl?._embedded.venues[0].location,
//                     city: vl?._embedded.venues[0].city.name,
//                     country: vl?._embedded.venues[0].country.name,
//                     name: vl?._embedded.venues[0].name,
//                     postal: vl?._embedded.venues[0].postalCode,
//                 },
//             };
//         });
//     })
//     .then((data) => {
//         // return data
//         d3.select("#map")
//             .select("svg")
//             .selectAll("myCircles")
//             .data(data)
//             .join("circle")
//             .attr(
//                 "cx",
//                 (d) =>
//                     map.latLngToLayerPoint([d.location.coords.latitude, d.location.coords.longitude]).x
//             )
//             .attr(
//                 "cy",
//                 (d) =>
//                     map.latLngToLayerPoint([d.location.coords.latitude, d.location.coords.longitude]).y
//             )
//             .attr("r", 14)
//             .style("fill", "red")
//             .attr("stroke", "red")
//             .attr("stroke-width", 3)
//             .attr("fill-opacity", .4)
//     });
// async function createGraph() {
//     //select svg area, add circles
//     d3.select("#map")
//         .select("svg")
//         .selectAll("myCircles")
//         .data(await markersCity)
//         .join("circle")
//         .attr("cx", (d) => map.latLngToLayerPoint([d.latitude, d.longitude]).x)
//         .attr("cy", (d) => map.latLngToLayerPoint([d.latitude, d.longitude]).y)
//         .attr("r", 14)
//         .style("fill", "red")
//         .attr("stroke", "red")
//         .attr("stroke-width", 3)
//         .attr("fill-opacity", 0.4);
// }

// async function update() {
//     d3.selectAll("circle")
//         // longLat data ophalen van data.location
//         .attr(
//             "cx",
//             (d) =>
//                 map.latLngToLayerPoint([d?.location.coords.latitude, d?.location.coords.longitude]).x
//         )
//         .attr(
//             "cy",
//             (d) =>
//                 map.latLngToLayerPoint([d?.location.coords.latitude, d?.location.coords.longitude]).y
//         );
// }
// // If the user change the map (zoom or drag), I update circle position:
// map.on("moveend", update);

// Lege array voor de markers van de locaties
// let markersCity = [];

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

// getData("/scripts/exV2.json")
//     .then((eventContent) => {
//         return eventContent?._embedded?.events.map((e) => {

//             const div = document.createElement("div");
//             const name = document.createElement("h2");
//             const date = document.createElement("p");
//             const genre = document.createElement("p");
//             const img = document.createElement("img");

//             name.innerText = `${e?.name}`
//             date.innerText = `Date: ${e?.dates.start.localDate}`
//             genre.innerText = `Genre: ${e?.classifications[0].genre.name}` // eerste element van array [0], anders loop gebruiken, object array etc
//             img.src = `${e?.images[0].url}`

//             div.appendChild(img)
//             div.appendChild(name)
//             div.appendChild(date)
//             div.appendChild(genre)

//             cardsEvents.appendChild(div)
//         });
//     })

d3.select('#eventSelect')
    .on('change', function () {

        let getEventId = d3.select(this).property("value");
        console.log(getEventId)
        let prom = getData("/scripts/exV2.json")
            .then((res) => {
                return res._embedded.events
            })
        Promise.resolve(prom).then((value) => {
            // HIER FILTER JE DE DATA DIE JE KRIJGT VAN DE DROPDOWN ACTIE. ALS JE EEN OPTIE KIEST KRIJG JE MINDER DAN 20 OPTIES (DE AANTAL OPTIES DIE DE GENRE HEEFT DIE JE KIEST)
            let filterArr = value.filter((eventGenre) => {
                return eventGenre?.classifications[0].genre.id == getEventId;
            });
            //console.log(filterArr);
            value.map((event) => {
                return event;
            });

        });
    });

    //test
function updateGenre() {
    d3.select("#map")
        .select("svg")
        .selectAll("myCircles")
        .data(markersCity)
        .join(
            (enter) =>
                enter
                    .append("circle")
                    .attr(
                        "cx",
                        (d) =>
                            map.latLngToLayerPoint([d?.location.coords.latitude, d?.location.coords.longitude]).x
                    )
                    .attr(
                        "cy",
                        (d) =>
                            map.latLngToLayerPoint([d?.location.coords.latitude, d?.location.coords.longitude]).y
                    )
                    .style("fill", "brown")
                    // .transition().duration(1000)
                    .style("opacity", 1)
                    .selection()
            ,
            (update) =>
                update
                // .transition().duration(1000)
                 .style("fill", "black")
                 .selection()
            ,
            (exit) =>
                exit
               // .transition().duration(1000)
                    .style("opacity", 0)
                    .remove()

        );

}

createGraph();

