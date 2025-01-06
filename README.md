# JS-Examination
API nyckel: 3a4bfb13
Exempel på var API nyckel matas in: https://www.omdbapi.com/?s=avengers&apikey=3a4bfb13

Länk till figma skiss: https://www.figma.com/design/AoNPUnxqxb9RcdRDDo7s6i/Untitled?node-id=0-1&p=f&t=IheTD1B40DMNqHko-0


Välkommen till min sida "FilmSamlaren"

I mitt projekt finns 4 filer och 1 mapp som består av:
index.html
script.js
styles.css
readme.md
samt en "img" mapp för bilder.

För att starta projektet i din webbläsare, navigera till index.html och öppna sidan. sedan vänster klicka på koden och välj "Open with live server" så ska projektet öppnas.

Mitt projekt tykcer jag är väldigt lättanvänt där du kan söka på alla möjliga filmer som finns. För att enkelt söka på en film så navigera längst upp i mitten på sidan där sökfältet är. Klicka på det och börja sök. För att få upp resultat måste man mata in minst 3st karaktärer för att API:et inte ska söka ihjäl sig :)

När du finner din film du sökt, så klicka enkelt på filmen så dyker en ny detaljerad sida där du får mer information om filmen.

För att stänga ner den detaljerade vyn så klickar du på "stäng" knappen längst ner i vänster hörn.

Annars finner du 10st som är i rampljuset som man kan spana in och läsa mer om.


Hur krav uppfylls: 

JSON-, HTTP/HTTPS-, asynkronitets- och UX/UI-kraven:

JSON:

Koden hanterar JSON-data genom att använda fetch-metoden för att hämta information från OMDB api:et. När svaret tas emot, parsas det med response.json(), vilket ger en JavaScript-objektstruktur som kan användas i appen. Koden kontrollerar också om sökresultatet är tomt och hanterar det på rätt sätt.

HTTP/HTTPS:

HTTPS används för alla API-anrop, så det säkerställer att datatrafiken är krypterad och säker.

Asynkronitet:

Koden använder async-funktioner för att hantera API-anrop. Till exempel, funktionerna fetchSearchMovies, fetchMovieDetails, och fetchAndDisplayFeaturedMovies är deklarerade som async, vilket möjliggör användning av await för att vänta på att fetch-anropen ska slutföras innan den fortsätter med nästa steg.

UX/UI:

Visa sökresultat dynamiskt när användaren skriver in en sökfråga.
Dölja sökresultaten om det inte finns några.
Visa detaljerad information om en film när användaren klickar på en film från sökresultaten eller de visade filmerna.
Använda knappar för att stänga detaljvyn och navigera genom informationen.


Beskriv hur du hämtar data från API:et (Vilket API? URL/enpoint, parametrar, API nyckel?):

API jag använder: OMDB API (Open Movie Database)

URL/Endpoint:

För att hämta sökresultat: https://www.omdbapi.com/?s={query}&apikey=3a4bfb13, där parametern "s=" i URL:en söker efter filmtitel vid sökning från sökfältet på sidan.

För att hämta detaljerad information om en film: https://www.omdbapi.com/?i={imdbID}&apikey=3a4bfb13, där parametern "i=" i URL:en använder imdb-ID från första endpointen för att hämta mer information om filmen som visas i detaljerad vy när du klickar på en sökt film.

Koden använder dessa endpoints för att hämta data baserat på användarens sökningar och för att visa detaljer för valda filmer.
API nyckel hittar du längst upp i dokumentet.
