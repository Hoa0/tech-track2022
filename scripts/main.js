import '../styles/style.css';
import * as d3 from 'd3';
import genres from './genres';
import createScatterPlot from './scatterplot'

console.log('movie api visualisation');

// scatterplot met tooltip
/*
Iedere film heeft een vote_average en een vote_count.
De locatie van een bal is afhankelijk van hoeveel stemmen het heeft en wat de average score ervan is.
Dit kan je filteren op genre (of de volgende pagina ophalen)
---
optioneel:
grouperen op basis van genre
*/

const key = '4b71f51362658b415354850521164bd5';
const page = "&page=";
let pageIdentifier = "1";
const popular = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&region=nl`;
const playingNow = `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}`;
const latest = `https://api.themoviedb.org/3/movie/latest?api_key=${key}`;
const posterUrl = 'https://image.tmdb.org/t/p/w500/';

async function getData(url) {
  const response = await fetch(url);
  const data = await response.json();
//   console.log(data)
  return data;
}

async function cleaningData(dataset) {
  let d = await dataset;
  return d.results.map(movie => {

    // console.log(movie)
  });
}
cleaningData(getData(popular));

function createDropdown(selector) {
    // Dropdown maken en deze de genres meegeven (dit is handmatig geschreven omdat de API dit niet meegeeft.)
    genres.forEach(element => {
        d3.select(selector)
            let option = document.createElement("option");
            option.value = element.id
            option.innerHTML = element.name;
            document.querySelector(selector).appendChild(option);
        })
        
        d3.select(selector).on('change', (e) => {
            console.log(e.target.value)
        })
}

// createDropdown('#genreSelector')




createScatterPlot(popular)