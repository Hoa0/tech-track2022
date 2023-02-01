import * as d3 from "d3";
import { getData } from "./data";

function eventsBtn (url, selector){
    const elementSelector = document.getElementById(selector);
    // console.log(selector, elementSelector);
    
    d3.select(elementSelector)
        .on('change', function (e) {
            let getEventId = d3.select(this).property("value");
            console.log(getEventId)
            let prom = getData(url)
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
}

    // //test 
    // function updateGenre() {
    //     d3.select("#map")
    //         .select("svg")
    //         .selectAll("myCircles")
    //         .data(markersCity)
    //         .join(
    //             (enter) =>
    //                 enter
    //                     .append("circle")
    //                     .attr(
    //                         "cx",
    //                         (d) =>
    //                             map.latLngToLayerPoint([d?.location.coords.latitude, d?.location.coords.longitude]).x
    //                     )
    //                     .attr(
    //                         "cy",
    //                         (d) =>
    //                             map.latLngToLayerPoint([d?.location.coords.latitude, d?.location.coords.longitude]).y
    //                     )
    //                     .style("fill", "brown")
    //                     // .transition().duration(1000)
    //                     .style("opacity", 1)
    //                     .selection()
    //             ,
    //             (update) =>
    //                 update
    //                 // .transition().duration(1000)
    //                  .style("fill", "black")
    //                  .selection()
    //             ,
    //             (exit) =>
    //                 exit
    //                // .transition().duration(1000)
    //                     .style("opacity", 0)
    //                     .remove()
    
    //         );
    
    // }

export {eventsBtn}