import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import Logo from './logo.svg';
import './App.css';
import SearchIcon from './search.svg';


const API_URL = "http://www.omdbapi.com?apikey=f8026fb4";

const movie1 = {
  "Title": "Amazing Spiderman",
  "Year": "2012",
  "Type": "movie",
  "Poster": Logo
}

const Person = (props) => {
  return (
    <>
      <h1>Name: {props.name}</h1>
      <h2>Last Name: {props.lastname}</h2>
      <h2>Age: {props.age}</h2>
    </>
  )
}

const App = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);

  }
  
  useEffect(() => {
    searchMovies('Spiderman');
  }, []);

  return (
    <div>
      <h1>Movie Land</h1>

      <div className='search'>
        <input placeholder='Search for Movies' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

        <img
          src={SearchIcon} alt="Search" onClick={() => searchMovies(searchTerm)}/>

      </div>

      {
        movies?.length > 0 ? (
          <div className='container'>
          {
            movies.map((movie) => (
              <MovieCard movie={movie}/>
            ))
          }

            {/* // <MovieCard movie={movie} /> */}

          </div>
        ) : (
          <div className='empty'>
            <h2>
              No Movies Found
            </h2>
          </div>
        )
      }

    </div>
  );

}

export default App;
