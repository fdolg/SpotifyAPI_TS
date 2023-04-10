import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
import React from 'react'
import search from '../util/Spotify'


const SearchBar = () =>{
    return(
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
    )
}

export default SearchBar;