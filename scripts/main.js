// Our bundler automatically creates styling when imported in the main JS file!
import '../styles/style.css'

// We can use node_modules directely in the browser!
import * as d3 from 'd3';


const baseURL = "https://app.ticketmaster.com/discovery/v2";
const venues = "/venues";
const offers ="/offers";
const events = "/events";
const key = "?apikey=uC0UADyMdASdYwjLJRHfjH8AjPzRlhFF&locale=*";
const endpoint = `${baseURL}${offers}${key}`;
const countryEvents ="https://app.ticketmaster.com/discovery/v2/events.json?apikey=uC0UADyMdASdYwjLJRHfjH8AjPzRlhFF&locale=*&countryCode=NL";

function getData() {
  fetch(countryEvents)
    .then((res) => res.json())
    .then((data) => {
      //console.log(data?._embedded?.venues);
      console.log(data?._embedded?.events);
      
    });
}

getData();
