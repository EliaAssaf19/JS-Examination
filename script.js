const featuredMovies = "https://www.omdbapi.com/?s=avengers&apikey=3a4bfb13";
const featuredContainer = document.getElementById("featured-movies");
const movieDetailsContainer = document.getElementById("movie-details");
const searchBar = document.getElementById("search-bar");
const searchResultsContainer = document.getElementById("search-results");

// Hantera sökning
searchBar.addEventListener("input", async (event) => {
  const query = event.target.value.trim();
  if (query.length > 2) {
    const searchResults = await fetchSearchMovies(query);
    displaySearchResults(searchResults);
  } else {
    searchResultsContainer.style.display = "none";
    updateResultCount(0);
  }
});

// Hämta sökresultat från API
async function fetchSearchMovies(query) {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${query}&apikey=3a4bfb13`
    );
    if (!response.ok) {
        processFetchError(response.status);
        return [];
      }
    const data = await response.json();
    return data.Search || [];
  } catch (error) {
    console.error("Fel vid hämtning av sökresultat:", error.message);
    return [];
  }
}

function displaySearchResults(searchResults) {
  searchResultsContainer.innerHTML = "";

  if (searchResults.length === 0) {
    searchResultsContainer.style.display = "none";
    updateResultCount(0); // Visa 0 resultat om inget hittas
    return;
  }

  searchResultsContainer.style.display = "block";
  updateResultCount(searchResults.length); // Uppdatera med antalet resultat

  searchResults.forEach((movie) => {
    const resultItem = document.createElement("div");
    resultItem.classList.add("search-result-item");
    resultItem.innerHTML = `<p>${movie.Title} (${movie.Year})</p>`;

    resultItem.addEventListener("click", () => {
      fetchMovieDetails(movie.imdbID);
      searchResultsContainer.style.display = "none";
      document.getElementById("result-count").style.display = "none"; // Dölj räknaren när en film väljs
    });

    searchResultsContainer.appendChild(resultItem);
  });
}

function updateResultCount(count) {
  const resultCountElement = document.getElementById("result-count");
  const countElement = document.getElementById("count");
  countElement.textContent = count;
  resultCountElement.style.display = count > 0 ? "block" : "none";
}

// Hämta filmens detaljer
async function fetchMovieDetails(imdbID) {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?i=${imdbID}&apikey=3a4bfb13`
    );
    if (!response.ok) {
        processFetchError(response.status);
        return;
      }
    const data = await response.json();
    displayMovieDetails(data);
  } catch (error) {
    console.error("Fel vid hämtning av filmens detaljer:", error.message);
  }
}

function getValidPoster(posterUrl) {
  const validUrl = posterUrl !== "N/A" ? posterUrl : "img/default-image.jpg";
  return validUrl;
}

// Visa filmens detaljer
function displayMovieDetails(movieDetails) {
  movieDetailsContainer.innerHTML = "";
  movieDetailsContainer.innerHTML = `
        <h3>${movieDetails.Title}</h3>
        <img src="${getValidPoster(movieDetails.Poster)}" alt="${
    movieDetails.Title
  } Poster">
        <p><strong>År:</strong> ${movieDetails.Year}</p>
        <p><strong>Genre:</strong> ${movieDetails.Genre}</p>
        <p><strong>Regissör:</strong> ${movieDetails.Director}</p>
        <p><strong>Handling:</strong> ${movieDetails.Plot}</p>
        <p><strong>IMDb-betyg:</strong> ${movieDetails.imdbRating}</p>
        <button onclick="closeMovieDetails()">Stäng</button>
        `;

  movieDetailsContainer.style.display = "block";
}

// Stäng detaljer-vy
function closeMovieDetails() {
  movieDetailsContainer.style.display = "none";
}

// Hämta och visa featured movies
async function fetchAndDisplayFeaturedMovies() {
  try {
    const response = await fetch(featuredMovies);
    if (!response.ok) {
        processFetchError(response.status);
        return;
      }
    const data = await response.json();
    createFeaturedMovies(data);
  } catch (error) {
    console.error("Fel vid hämtning av featured movies:", error.message);
  }
}

function createFeaturedMovies(featuredData) {
  let featuredMovieData = featuredData.Search;

  featuredContainer.innerHTML = "";

  featuredMovieData.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");

    const featuredPoster = document.createElement("img");
    featuredPoster.src = getValidPoster(movie.Poster);
    movieElement.innerHTML = `
    <h3>${movie.Title}</h3>
    <p>År: ${movie.Year}</p>
    `;

    const infoButton = document.createElement("button");
    infoButton.textContent = "Läs mer";
    infoButton.addEventListener("click", () => {
      fetchMovieDetails(movie.imdbID);
    });

    movieElement.appendChild(featuredPoster);
    movieElement.appendChild(infoButton);

    featuredContainer.appendChild(movieElement);
  });
}

// Error hantering
function processFetchError(statusCode) {
    switch (statusCode) {
        case 404:
            console.error("Fel: Resurs hittades inte (404)");
            displayError("Den sökta filmen kunde inte hittas. Prova med en annan titel.");
            break;
        case 500:
            console.error("Fel: Internt serverfel (500)");
            displayError("Ett internt fel har inträffat på servern. Försök igen senare.");
            break;
        case 503:
            console.error("Fel: Tjänsten är otillgänglig (503)");
            displayError("Tjänsten är för tillfället otillgänglig. Kontrollera din internetanslutning.");
            break;
        case 504:
            console.error("Fel: Gateway timeout (504)");
            displayError("Gateway-fel. Kontrollera eventuella nätverksproblem.");
            break;
        default:
            console.error("Fel: Ett oväntat fel inträffade");
            displayError("Något oväntat gick fel. Vänligen försök igen senare.");
            break;
    }
}

fetchAndDisplayFeaturedMovies();