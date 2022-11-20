//https://app.ticketmaster.com/discovery/v2/venues?apikey=uC0UADyMdASdYwjLJRHfjH8AjPzRlhFF&locale=*
const baseURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=";
const venues = "/venues";
const offers = "/offers";
const events = "/events";
const key = "?apikey=uC0UADyMdASdYwjLJRHfjH8AjPzRlhFF&locale=*";
const endpoint = `${baseURL}${events}${key}`;

// function getData(key) {
//     return fetch(key)
//         .then((res) => res.json())
//         .then((data) => {
//             //console.log(data._embedded.events);
//             // console.log(data._embedded.venues) //console.log object in zijn geheel
//             return data._embedded.venues.map((venueLocation) => {
//                 // console.log(data?._embedded?.venues);
//                 return {
//                     name: venueLocation?.name,
//                     location: venueLocation?.location,
//                     address: {
//                         address: venueLocation?.address,
//                         city: venueLocation?.city.name,
//                         country: venueLocation?.country,
//                         state: venueLocation?.state
//                     }
//                 };
//             });
//         })
//         .then((data) => {
//             // console.log(data);
//             return data;
//         });
// }

import * as d3 from 'd3';

function getData(url) {
    return d3.json(url)
}

export { getData }