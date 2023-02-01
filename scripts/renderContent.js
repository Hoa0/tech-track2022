import { getData } from "./data";

async function renderContent(url, selector) {
    const elementSelector = document.getElementById(selector);
    getData(url)
        .then((eventContent) => {
            return eventContent?._embedded?.events.map((e) => {

                const div = document.createElement("div");
                const name = document.createElement("h2");
                const date = document.createElement("p");
                const genre = document.createElement("p");
                const img = document.createElement("img");

                name.innerText = `${e?.name}`
                date.innerText = `Date: ${e?.dates.start.localDate}`
                genre.innerText = `Genre: ${e?.classifications[0].genre.name}`
                img.src = `${e?.images[0].url}`

                div.appendChild(img)
                div.appendChild(name)
                div.appendChild(date)
                div.appendChild(genre)

                elementSelector.appendChild(div)
            });
        })
}

export { renderContent}