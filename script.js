const apiDataTitle = "https://www.omdbapi.com/?s=&apikey=3a4bfb13";
const apiDataInfo = "http://www.omdbapi.com/?i=&apikey=3a4bfb13";

const featuredMovies = "https://www.omdbapi.com/?s=avengers&apikey=3a4bfb13";

const featuredContainer = document.getElementById("featured-movies");

async function fetchApiDataTitle() {
    try {
        const response = await fetch(apiDataTitle);
        if (!response.ok) {
            errorHandle(response);
        }
        const data = await response.json();
        console.log(data)
        return data;
    }   catch (error) {
        console.error("Error fetching OMDB Api data:", error.message);
    }
}

async function fetchApiDataInfo() {
    try {
        const response = await fetch(apiDataInfo);
        if (!response.ok) {
            errorHandle(response);
        }
        const data = await response.json();
        console.log(data)
        return data;
    }   catch (error) {
        console.error("Error fetching OMDB Api data:", error.message);
    }
}

async function fetchFeaturedMovies() {
    try {
        const response = await fetch(featuredMovies);
        if (!response.ok) {
            errorHandle(response);
        }
        const data = await response.json();
        // console.log(data)
        return data;
    }   catch (error) {
        console.error("Error fetching OMDB Api data:", error.message);
    }
}

async function displayFeaturedMovies() {
    try {
        const [featuredData] = await Promise.all([
            fetchFeaturedMovies()
        ]);
        
        if (featuredData) {
            createFeaturedMovies(featuredData);
        }

    }    catch (error) {
        console.error("Error in displayFeatureMovies:", error.message);
    }
}

function createFeaturedMovies(featuredData) {
    
        let featuredMovieData = featuredData.Search;
    console.log(featuredMovieData)

    if (!featuredContainer) {
        console.error("element finns inte.");
        return;
    }

    featuredMovieData.forEach(movie => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");
        
        const featuredPoster = document.createElement("img");
        featuredPoster.src = movie.Poster !== "N/A" ? movie.Poster : "default-image.jpg";
        featuredPoster.alt = `${movie.Title} Poster`; 

        movieElement.innerHTML =`
        <h3>${movie.Title}</h3>
        <p>År: ${movie.Year}</p>
        <p>imbdID: ${movie.imdbID}</p>
        `;

        movieElement.appendChild(featuredPoster)

        featuredContainer.appendChild(movieElement);

    });
}
displayFeaturedMovies()
createFeaturedMovies()