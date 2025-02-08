import React, { useState, useEffect } from 'react';
import Search from './Components/Search';
import Spinner from './Components/Spinner';
import MovieCard from './Components/MovieCard';
import { useDebounce } from 'react-use';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`  // Fixed typo
  }
};

function App() {
  const [search, setSearch] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movies,setMovies]=useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [debouncedsearch,setdenounced]=useState('');

useDebounce(()=> setdenounced(search),500,[search])

  const fetchMovies = async (query='') => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint =  query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      
      if(data.response==='false'){
        setErrorMessage(data.Error||'Failed to fetch');
        setMovies([]);
        return;
      }
      setMovies(data.results||[])
    } catch (err) {
      setErrorMessage("Failed to load movies. Check API key and CORS settings.");
      console.error(err);
    }
    finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedsearch);
  }, [debouncedsearch]);

  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <img src="./hero.png" alt="Hero" />
            <h1>Find <span className="text-gradient">Movies</span> You Will Enjoy Without The Hassle</h1>
            <Search search={search} setSearch={setSearch} />
          </header>
          <div className="all-movies">
            <h2 className='mt-[40px]'>All Movies</h2>
           {isLoading ? (
           <Spinner/> 
           ):errorMessage?(
            <p className="text-red-500">{errorMessage}</p>
           ):(
            <ul>
              {movies.map((movie)=>(
               <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
           )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
