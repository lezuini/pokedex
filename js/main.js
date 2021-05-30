const d = document,
  $main = d.querySelector("main"),
  $links = d.querySelector(".links");

let pokeAPI = "https://pokeapi.co/api/v2/pokemon/";

const loadPokemon = async (url) => {
  try {
    $main.innerHTML = `<span class="loader"></span>`;

    let res = await fetch(url, {
        headers: {
          "Cache-Control": "public",
        },
      }),
      json = await res.json(),
      $template = "",
      $navPrev,
      $navNext;

    console.log(json);

    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    for (let i = 0; i < json.results.length; i++) {
      try {
        let res = await fetch(json.results[i].url),
          pokemon = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        $template += `
              <figure>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <figcaption>${pokemon.name}</figcaption>
              </figure>
              `;
      } catch (error) {
        console.log(error);
        let message = error.statusText || "An error occurred";
        $template += `
              <figure>
                <figcaption>Error ${error.status}: ${message}</figcaption>
              </figure>`;
      }
    }

    $main.innerHTML = $template;
    $navPrev = json.previous ? `<a href="${json.previous}">⏮️</a>` : "";
    $navNext = json.next ? `<a href="${json.next}">⏭️</a>` : "";
    $links.innerHTML = $navPrev + "   " + $navNext;
  } catch (error) {
    console.log(error);
    let message = error.statusText || "An error occurred";
    $main.innerHTML = `Error ${error.status}: ${message}`;
  }
};

d.addEventListener("DOMContentLoaded", (e) => loadPokemon(pokeAPI));

d.addEventListener("click", (e) => {
  if (e.target.matches(".links a")) {
    e.preventDefault();
    loadPokemon(e.target.getAttribute("href"));
  }
});
