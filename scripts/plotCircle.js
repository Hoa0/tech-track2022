import * as d3 from "d3";
import { getData } from "./data";
import { map } from "./variables"


async function renderLocation(url) {
    getData(url)
        .then((data) => {
            // console.log(data);
            return data._embedded.events.map((vl) => {
                createDropdownOption(vl?.classifications[0]?.genre?.id, vl?.classifications[0]?.genre?.name)
                // genre laten zien in de dropdown
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
            // return data
            d3.select("#map")
                .select("svg")
                .selectAll("myCircles")
                .data(data)
                .join(
                    enter => {
                        return enter
                        .append("circle")
                    },
                    update => {
                        return update
                    },
                    exit => {
                        return exit.remove()
                    }
                )
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
}

async function createGraph(markesData) {
    //select svg area, add circles
    d3.select("#map")
        .select("svg")
        .selectAll("myCircles")
        // .data(await markersCity)
        .data(await markesData)
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

function updateGenre(){
    d3.selectAll(option).each(function(d){
        optionData = d3.select(this);
        grp = optionData.property("value")
        
    })
}



let temp = []
// DIT ACHTERWEGE LATEN. LOGICA OM DUPLICATEN UIT DE SELECT TE HALEN.
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
// Functie om dropdown opties te maken.
function createDropdownOption(value, name) {
    // voeg waarde toe aan de tijdelijke array (bovenin het bestand gedefineerd.)
    temp.push({value, name})
    let unique = temp.filter(onlyUnique)
    // console.log(unique)
    
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = name;
    document.querySelector('#eventSelect').appendChild(option);

    // console.log(temp)
    // let option = document.createElement("option");
    // option.value = value;
    // option.innerHTML = name;
    // document.querySelector('#eventSelect').appendChild(option);
}


export { renderLocation, createGraph }