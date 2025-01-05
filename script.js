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
  }
});

// Hämta sökresultat från OMDB API
async function fetchSearchMovies(query) {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${query}&apikey=3a4bfb13`
    );
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    return data.Search || [];
  } catch (error) {
    console.error("Error fetching search results:", error.message);
    return [];
  }
}

// Visa sökresultat
function displaySearchResults(searchResults) {
  searchResultsContainer.innerHTML = "";

  if (searchResults.length === 0) {
    searchResultsContainer.style.display = "none";
    return;
  }

  searchResultsContainer.style.display = "block";

  searchResults.forEach((movie) => {
    const resultItem = document.createElement("div");
    resultItem.classList.add("search-result-item");
    resultItem.innerHTML = `<p>${movie.Title} (${movie.Year})</p>`;

    resultItem.addEventListener("click", () => {
      fetchMovieDetails(movie.imdbID);
      searchResultsContainer.style.display = "none";
    });

    searchResultsContainer.appendChild(resultItem);
  });
}

// Hämta filmens detaljer
async function fetchMovieDetails(imdbID) {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?i=${imdbID}&apikey=3a4bfb13`
    );
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    displayMovieDetails(data);
  } catch (error) {
    console.error("Error fetching movie details:", error.message);
  }
}

function getValidPoster(posterUrl) {
    return posterUrl !== "N/A" ? posterUrl : "default-image.jpg";
  }

// Visa filmens detaljer
function displayMovieDetails(movieDetails) {
  movieDetailsContainer.innerHTML = "";
  movieDetailsContainer.innerHTML = `
        <h2>${movieDetails.Title}</h2>
        <img src="${getValidPoster(movieDetails.Poster)}" alt="${movieDetails.Title} Poster">
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
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    createFeaturedMovies(data);
  } catch (error) {
    console.error("Error fetching featured movies:", error.message);
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

fetchAndDisplayFeaturedMovies()
