import { getData } from "./data";
import "../styles/style.css";

//getData("/scripts/exV2.json")
// .then(data => {
//     renderContent(data.results)
// })


//const cardsEvents = document.getElementById("cards-container")

// function renderContent(data) {
//     data.forEach(vl => {
//         //data._embedded.events[0].map((vl) => {
//         //data.map((vl) => {
//         const div = document.createElement('div');
//         const name = document.createElement('h3');
//         name.innerText = `name: ${vl.name}`

//         div.appendChild(name)

//         cardsEvents.appendChild(div)
//     });
// };

// function renderContent(data) {
//     data.forEach(function (val) {

//         // Adding each object keys
//         var keys = Object.keys(val);
//         // Generating new html
//         html += "<div class = 'cat'>";
//         // Adding the custom html to each key
//         keys.map(function (key) {

//             html += "<strong>" + key + "</strong>: " + val[key] + "<br>";

//         });

//         html += "</div><br>";

//     });

//     // Add your code above this line
//     document.getElementsByClassName('message')[0].innerHTML = html;
// };


// getData("/scripts/exV2.json")
//     .then((event) => {
//         // Juiste event data ophalen, ipv alleen event. daar binnen in heb ik de venues van nodig
//         let dataElement = event?._embedded?.events;

//         return dataElement.map((e) => {
//             // console.log(e?.location)
//             //  console.log(e)
//             //markersCity.push(e?._embedded.venues.location);
//             //return e?._embedded.venues.location;
//         });
//     })

// function renderContent(data) {
//     data.forEach(vl => {
//         //data._embedded.events[0].map((vl) => {
//         //data.map((vl) => {
//         const div = document.createElement('div');
//         const name = document.createElement('h3');
//         name.innerText = `name: ${vl.name}`

//         div.appendChild(name)

//         cardsEvents.appendChild(div)
//     });
// };


getData("/scripts/exV2.json")
    .then(data => {
        renderContent(data._embedded.events)
    })


const cardsEvents = document.getElementById("cards-container")
function renderContent(data) {
    data.forEach(vl => {
        //data?._embedded.events[0].map((vl) => {
        //data.map((vl) => {
        const div = document.createElement('div');
        const name = document.createElement('h3');
        name.innerText = `name: ${vl.name}`

        div.appendChild(name)

        cardsEvents.appendChild(div)
    });
};

getData("/scripts/exV2.json")
    .then((data) => {
        // console.log(data);
        return data._embedded.events.map((vl) => {
            //console.log(vl);
            let option = document.createElement("option");
            option.value = vl?.classifications[0]?.genre?.id;
            option.innerHTML = vl?.classifications[0]?.genre?.name;
            document.querySelector('#eventSelect').appendChild(option);
            //console.log('test', option)

        })
    })



// const data = {
//     hostname: {
//         typeA: ['string 1 - 111', 'string 2 - 222', 'string 3 - 333'],
//         typeB: ['string 1 - 111', 'string 4 - 444', 'string 5 - 555'],
//         typeC: ['string 1 - 111', 'string 6 - 666'],
//     },
// };

// const seen = new Set();

// for (const key of Object.keys(data.hostname)) {
//     data.hostname[key] = data.hostname[key].filter((s) => {
//         const _seen = seen.has(s);
//         seen.add(s);

//         return !_seen;
//     });
// }

// console.log(data);