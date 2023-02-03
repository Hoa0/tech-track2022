import * as d3 from "d3";
import genres from "./genres";


/**
 * Functie voor het ophalen van data uit een api
 * @param {url} string 
 */

async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();

    return data;
}

//  async function cleaningData(dataset) {
//     let d = await dataset;
//     return d.results.map((movie) => {
//       // console.log(movie)
//     });
//   }

/**
 * create dropdown button, werkt nog niet
 * @param {selector} String a query for d3's queryselector
 */
function createDropdown(selector) {
    genres.forEach((element) => {
        d3.select(selector);

        let option = document.creareElement("option");
        option.value = element.id;
        option.innerHTML = element.name;
        document.querySelector(selector).appendChild(option);
    });

    d3.select(selector).on("change", (e) => {
        //console.log(e.target.value);
    });
}

export { getData }


