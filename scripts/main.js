import "../styles/style.css";
import * as d3 from "d3";
import { getData } from "./utils";
import createScatterPlot from "./scatterplot";

// scatterplot met tooltip
/*
0 Iedere film heeft een vote_average en een vote_count.
0 De locatie van een bal is afhankelijk van hoeveel stemmen het heeft en wat de average score ervan is.
x Dit kan je filteren op genre (of de volgende pagina ophalen)
---
optioneel:
grouperen op basis van genre
*/

const key = "4b71f51362658b415354850521164bd5";
const page = "&page=";
let pageIdentifier = "1";
const popular = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&region=nl`;
const playingNow = `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&region=nl`;
const latest = `https://api.themoviedb.org/3/movie/latest?api_key=${key}&region=nl`;
const posterUrl = "https://image.tmdb.org/t/p/w500/";

const margin = { top: 30, right: 30, bottom: 70, left: 60 },
    width = 500 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

const svg = d3
    .select("#barchart")
    .append("svg")
    .attr("width", width * 2 + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left * 4}, ${margin.top})`);

/*
Alle comments over de X en Y as zorgt ervoor dat de titels op de Y as staan
Om het om te draaien, moet je de comments eruit halen en de andere comments erin zetten
*/
const x = d3.scaleLinear().range([0, width]);
const xAxis = svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .attr("class", "axisX");

const y = d3.scaleBand().range([0, height]).padding(0.2);
const yAxis = svg.append("g").attr("class", "axisY");

async function renderBarchart(dataset) {
    // console.log(await dataset)
    dataset = await dataset.results;

    // Functie zorgt ervoor dat de data wordt gesorteerd op de hoogste score
    dataset.sort(function (b, a) {
        return a.vote_average - b.vote_average;
    });

    x.domain([0, d3.max(dataset, (d) => d.vote_average)]);
    xAxis.transition().duration(200).call(d3.axisBottom(x));

    y.domain(dataset.map((d) => d.title));
    yAxis.transition().duration(600).call(d3.axisLeft(y));

    // create tooltip
    const tooltip = d3
        .select("#barchart")
        .append("div")
        .style("opacity", 0)
        .attr("class", "barchart-tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px");

    // create variable for the bars
    let u = svg.selectAll("rect").data(dataset);

    // mouseover event dat de tooltip maakt en laat zien
    const mouseover = function (event, d) {
        tooltip
            // .html(d.title + " " + d.vote_average)
            .html(
                `<img src="${posterUrl}${d.poster_path}"> <p>${d.title}</p><p>Avg score: ${d.vote_average}</p> <p>${d.overview}</p>`
            )
            .style("opacity", 1);
    };

    // mousemove zorgt ervoor dat de tooltip je cursor volgt
    const mousemove = function (event, d) {
        tooltip
            .style("transform", `translateY(-55%)`)
            .style("transform", `translateX(65%)`)
            .style("left", event.x / 2 + "px")
            .style("top", event.y + "px");
    };

    // mouseleave zorgt ervoor dat de tooltip weer verdwijnt
    const mouseleave = function (event, d) {
        tooltip.style("opacity", 0);
    };

    /**
     * het aanmaken van bars
     */
    u.join(
        (enter) => {
            const balk = enter.append("rect");
            balk.style("opacity", 0.75).append("title");
            return balk;
        },
        (update) => {
            return update.transition().style("fill", "green");
        },
        (exit) => {
            return exit.style("opacity", "0").remove();
        }
    )
        .transition()
        .duration(1000)
        .attr("x", (d) => x(0))
        .attr("y", (d) => y(d.title))
        .attr("width", (d) => x(d.vote_average))
        .attr("height", y.bandwidth())
        .attr("fill", "pink")
        .select("title")
        .text((d) => {
            return `${d.title}: ${d.vote_average}`;
        });

    u.on("mouseover", mouseover)
    u.on("mousemove", mousemove)
    u.on("mouseleave", mouseleave);

}

async function main() {
    const data = await getData(popular);
    console.log(await data)
    // create barchart
    renderBarchart(data);
    // create scatterplat
    createScatterPlot(popular);
}

/**
 * functie voor de volgende knop om meer data weer te geven
 */
async function getNextPage() {
    pageIdentifier++;
    pageCheck(1, 20);
    let newData = await getData(popular + page + pageIdentifier);
    renderBarchart(await newData);
}

async function getPrevPage() {
    pageCheck(1, 20);
    pageIdentifier--;
    if (pageCheck(1, 20)) {
        return;
    }
    let newData = await getData(popular + page + pageIdentifier);
    console.log(newData)
    renderBarchart(await newData);

}

function pageCheck(minNum, maxNum) {
    if (pageIdentifier == minNum) {
        // alert("You are on the first page");
        return false;
    } else if (pageIdentifier == maxNum) {
        // alert("You are on the last page");
        return;
    }
}

d3.select(".next").on("click", () => {
    getNextPage();
});

d3.select(".previous").on("click", () => {
    // getPrevPage(current);
    getPrevPage();
});


main();



