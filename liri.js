/*
require("dotenv").config();

////////////////////////SPOTIFY BEGIN

var Spotify = require('node-spotify-api');

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data);
console.log("---!!!---")
});

/////////////////SPOTIFY END


/////////////OMDB API
var axios = require("axios");

// Store all of the arguments in an array
var nodeArgs = process.argv;

// Create an empty variable for holding the movie name
var movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 2; i < nodeArgs.length; i++) {

  if (i > 2 && i < nodeArgs.length) {
    movieName = movieName + "+" + nodeArgs[i];
  }
  else {
    movieName += nodeArgs[i];

  }
}

// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
    console.log(response.data.Title)
    console.log("Release Year: " + response.data.Year);
    console.log("IMDB Rating: " + response.data.imdbRating);
    console.log("Rotten Tomatoes Score: " + response.data.Ratings[1].Value);;
    console.log("Country of Production: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot Description: " + response.data.Plot);
    console.log("Cast: " + response.data.Actors); 
  }
);

////END OMDB//////


//////BANDS IN TOWN//////
var bandsQuery = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

*/////////////////
require("dotenv").config();
var axios = require("axios");
var command = process.argv[2];
var term = process.argv.slice(3).join(" ")


switch (command){
  case 'movie-this': movieThis(); break
  case 'spotify-this-song': spotifyThis(); break
  case 'concert-this': concertThis(); break
  default: console.log("Invalid command");
}

////////////////////////SPOTIFY BEGIN
function spotifyThis(){
  var Spotify = require('node-spotify-api');

  var keys = require("./keys.js");
  
  var spotify = new Spotify(keys.spotify);
  var searchterm = term || "Here Comes The Hotstepper"

  spotify.search({ type: 'track', query: searchterm }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    if (data.tracks.items[0]) { 
      console.log("ARTIST: " , data.tracks.items[0].artists[0].name);
      console.log("TITLE: " , data.tracks.items[0].name)
      console.log("PREVIEW: " , data.tracks.items[0].preview_url);
      console.log("ALBUM: " , data.tracks.items[0].album.name)
      // console.log("HREF CONSOLE: " , data.tracks.items[0].album.href);
      // console.log("-----------BELOW----------")

        } else { 
          console.log("Invalid song")
        }
  });
}

// * Artist(s)

//      * The song's name
//      * A preview link of the song from Spotify
//      * The album that the song is from
//    * If no song is provided then your program will default to "The Sign" by Ace of Base.

/////////////////SPOTIFY END


/////////////OMDB API


// Store all of the arguments in an array

function movieThis(){



// Create an empty variable for holding the movie name
// //////var movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
// ////////for (var i = 2; i < nodeArgs.length; i++) {

//   if (i > 2 && i < nodeArgs.length) {
//     movieName = movieName + "+" + nodeArgs[i];
//   }
//   else {
//     movieName += nodeArgs[i];

//   }
// }

// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
    console.log(response.data.Title)
    console.log("Release Year: " + response.data.Year);
    console.log("IMDB Rating: " + response.data.imdbRating);
    console.log("Rotten Tomatoes Score: " + response.data.Ratings[1].Value);;
    console.log("Country of Production: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot Description: " + response.data.Plot);
    console.log("Cast: " + response.data.Actors); 
  }
);
}
////END OMDB//////


function concertThis(){
  var bandsQuery = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
}
//////BANDS IN TOWN//////