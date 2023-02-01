import { getData } from "./data";
import * as d3 from "d3";


async function renderContent(url, selector) {
    const elementSelector = document.getElementById(selector);
    getData(url)
        .then((eventContent) => {
            return eventContent?._embedded?.events.map((e) => {

                elementSelector.appendChild(
                    createCard(
                      e?.name,
                      e?.dates.start.localDate,
                      e?.classifications[0].genre.name,
                      e?.images[0].url
                    )
                  );
            });
        })
}

function createCard(naam, datum, genr, foto) {
    const div = document.createElement('div');
    const name = document.createElement('h2');
    const date = document.createElement('p');
    const genre = document.createElement('p');
    const img = document.createElement('img');
  
    name.innerText = `${naam}`;
    date.innerText = `Date: ${datum}`;
    genre.innerText = `Genre: ${genr}`;
    img.src = `${foto}`;
  
    div.appendChild(img);
    div.appendChild(name);
    div.appendChild(date);
    div.appendChild(genre);
  
    return div;
  }

export { renderContent}