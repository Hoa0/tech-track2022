// Our bundler automatically creates styling when imported in the main JS file!
import '../styles/style.css'

// We can use node_modules directely in the browser!
import * as d3 from 'd3';


const baseURL = "https://app.ticketmaster.com/discovery/v2/venues";
const key = "?apikey=uC0UADyMdASdYwjLJRHfjH8AjPzRlhFF&locale=*";
const endpoint = "https://app.ticketmaster.com/discovery/v2/venues?apikey=uC0UADyMdASdYwjLJRHfjH8AjPzRlhFF&locale=*";

function getData() {
  fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      console.log(data?._embedded?.venues);
      
    });
}

getData();
