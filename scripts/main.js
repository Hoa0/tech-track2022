// Our bundler automatically creates styling when imported in the main JS file!
import '../styles/style.css'

// We can use node_modules directely in the browser!
import * as d3 from 'd3';

//https://app.ticketmaster.com/discovery/v2/venues?apikey=uC0UADyMdASdYwjLJRHfjH8AjPzRlhFF&locale=*
const baseURL = "https://app.ticketmaster.com/discovery/v2";
const venues = "/venues";
const offers = "/offers";
const events = "/events";
const key = "?apikey=uC0UADyMdASdYwjLJRHfjH8AjPzRlhFF&locale=*";
const endpoint = `${baseURL}${venues}${key}`;
const countryEvents = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=uC0UADyMdASdYwjLJRHfjH8AjPzRlhFF&locale=*&countryCode=NL";
const test = "https://app.ticketmaster.com/discovery/v2/venues?apikey=uC0UADyMdASdYwjLJRHfjH8AjPzRlhFF&locale=*";

// function getData() {
//     fetch(endpoint)
//         .then((res) => res.json())
//         .then((data) => {
//             console.log(data?._embedded?.venues);

//         });
// }

// getData();

function getData(key) {
    fetch(key)
        .then((res) => res.json())
        .then((data) => {
            // console.log(data._embedded.venues) //console.log object in zijn geheel
            return data._embedded.venues.map((venueLocation) => {
                return {
                    name: venueLocation?.name,
                    location: venueLocation?.location,
                    address: {
                        address: venueLocation?.address,
                        city: venueLocation?.city.name,
                        country: venueLocation?.country,
                        state: venueLocation?.state
                    }
                };
            });
        })
        .then((data) => {
            console.log(data);
            return data;
        });
}

getData(test);





