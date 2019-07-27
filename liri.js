/////////////////
require("dotenv").config();
var moment = require("moment");
var axios = require("axios");
var command = process.argv[2];
var term = process.argv.slice(3).join(" ")

switch (command){
  case 'movie-this': movieThis(); break
  case 'spotify-this-song': spotifyThis(); break
  case 'concert-this': concertThis(); break
  default: console.log("Invalid command");
}
//////BANDS IN TOWN//////
function concertThis() {

  var bandsQuery = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp";

  axios.get(bandsQuery).then(function(response) {

    var concertDate = response.data[0].datetime.slice(0, 10);
    var randomFormat = "MM/DD/YYYY";
    var convertedDate = moment(concertDate).format(randomFormat);
    

    console.log("ARTIST: " , response.data[0].lineup[0])
    console.log("VENUE: " , response.data[0].venue.name);
    console.log("LOCATION: " , response.data[0].venue.city , ", " + response.data[0].venue.region);
    // console.log("DATE: " , response.data[0].datetime);
    console.log("DATE: " , convertedDate);
  
  });
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

/////////////OMDB BEGIN//////////////
function movieThis(){

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
