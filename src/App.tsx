import { useState, useEffect } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';




function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);

  useEffect(()=>{
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

  },[]);

  //Search
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

  return (
    <div className="App">
      <Container>
        <InputGroup className='mb-3' size='lg'>
          <FormControl 
            placeholder='Search for Artist'
            onKeyPress={ event=>{
              if(event.key == "Enter"){
                search();
              }
            }}
            onChange ={event=> setSearchInput(event.target.value)}
          />     
          <Button onClick ={search}>
            Search
          </Button>
        </InputGroup>
      </Container>
      <Container>
        <Row className='mx-2 row-cols-4'>
          {albums.map(album=>{
            return(
              <Card>
              <Card.Img src={album.images[0].url} />
              <Card.Body>
                <Card.Title>{album.name}</Card.Title>
              </Card.Body>
            </Card> 
            )
          })}
   
        </Row>
      </Container>
    </div>
  )
}

export default App
