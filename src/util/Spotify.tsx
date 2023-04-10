import { useState, useEffect } from 'react'

const CLIENT_ID='cdc34b97d148422fbd627cd24ca7ba2c';
const CLIENT_SECRET ='4f337e6a87af436696126dc6645f4b63';
const [searchInput, setSearchInput] = useState("");
const [accessToken, setAccessToken] = useState("");
const [albums, setAlbums] = useState([]);

async function getToken() {
    
    //API Access Token
    var authParamaters ={
      method: 'POST',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id='+ CLIENT_ID + '&client_secret='+ CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', authParamaters)
    .then(results => results.json())
    .then(data => setAccessToken(data.access_token))
}



async function search() {
    console.log("Search for "+ searchInput);

    //Get request using search to get the Artist ID

    var searchParameters ={
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
      
    }
    var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput
    + '&type=artist', searchParameters)
    .then(response=> response.json())
    .then(data => { return data.artists.items[0].id})

    // Get request with Artist ID grab all the albums from the artist
      var returnedAlbums = await fetch ('https://api.spotify.com/v1/artists/' + artistID + '/albums?' + 
      'include_groups=album&limit=50', searchParameters)
      .then(response => response.json())
      .then(data=>{setAlbums(data.items)}); 

  }

export default search;