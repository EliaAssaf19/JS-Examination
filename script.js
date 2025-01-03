const featuredMovies = "https://www.omdbapi.com/?s=avengers&apikey=3a4bfb13";
const featuredContainer = document.getElementById("featured-movies");
const movieDetailsContainer = document.getElementById("movie-details");

async function fetchFeaturedMovies() {
    try {
        const response = await fetch(featuredMovies);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }   catch (error) {
        console.error("Error fetching OMDB Api data:", error.message);
    }
}

async function fetchMovieDetails(imdbID) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=3a4bfb13`);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        displayMovieDetails(data)
        console.log(data)
    }   catch (error) {
        console.error("Error fetching Movie details:", error.message);
    }
}


function createFeaturedMovies(featuredData) {
    let featuredMovieData = featuredData.Search;
console.log(featuredMovieData)


featuredContainer.innerHTML = "";

featuredMovieData.forEach(movie => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    
    const featuredPoster = document.createElement("img");
    featuredPoster.src = movie.Poster !== "N/A" ? movie.Poster : "default-image.jpg";
    featuredPoster.alt = `${movie.Title} Poster`; 

    movieElement.innerHTML =`
    <h3>${movie.Title}</h3>
    <p>År: ${movie.Year}</p>
    `;

    const infoButton = document.createElement("button");
    infoButton.textContent = "Läs mer";
    infoButton.addEventListener("click", () => {
        fetchMovieDetails(movie.imdbID);
    });

    movieElement.appendChild(featuredPoster)
    movieElement.appendChild(infoButton);

    featuredContainer.appendChild(movieElement);

});
}

    function displayMovieDetails(movieDetails) {
        movieDetailsContainer.innerHTML = "";

        movieDetailsContainer.innerHTML = `
         <h2>${movieDetails.Title}</h2>
        <img src="${movieDetails.Poster !== "N/A" ? movieDetails.Poster : "default-image.jpg"}" alt="${movieDetails.Title} Poster">
        <p><strong>År:</strong> ${movieDetails.Year}</p>
        <p><strong>Genre:</strong> ${movieDetails.Genre}</p>
        <p><strong>Regissör:</strong> ${movieDetails.Director}</p>
        <p><strong>Handling:</strong> ${movieDetails.Plot}</p>
        <p><strong>IMDb-betyg:</strong> ${movieDetails.imdbRating}</p>
        <button onclick="closeMovieDetails()">Stäng</button>
        `;

        movieDetailsContainer.style.display = "block";
    }

    function closeMovieDetails() {
        movieDetailsContainer.style.display = "none";
    }

async function displayFeaturedMovies() {
    try {
        const featuredData = await fetchFeaturedMovies();
        if (featuredData) {
            createFeaturedMovies(featuredData);
        }
    }    catch (error) {
        console.error("Error in displayFeatureMovies:", error.message);
    }
}

displayFeaturedMovies();
