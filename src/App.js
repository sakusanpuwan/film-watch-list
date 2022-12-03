import { useEffect, useState } from 'react';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

import './App.css';
import Home from './components/Home';
import MovieList from './components/MovieList';
import Search from './components/Search';
import Top250 from './components/Top250';
import Watchlist from './components/WatchList';


function App() {

  const [top250MoviesData,setTop250MoviesData] = useState([]);
  const [popMoviesData,setPopMoviesData] = useState([]);

  const fetch250MoviesData = async () => {
    const response = await fetch("https://imdb-api.com/en/API/Top250Movies/k_ttyuxc1j");
    const data = await response.json();
    setTop250MoviesData(data);
  }

  const fetchPopMovieData = async () => {
    const response = await fetch("https://imdb-api.com/en/API/MostPopularMovies/k_ttyuxc1j");
    const data = await response.json();
    setPopMoviesData(data);
  }

  useEffect(() => {
    fetch250MoviesData();
    fetchPopMovieData();
  },[])

  return (
    <div className="App">
        <BrowserRouter>

        <ul className='navbar'>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/watchlist'>Watch List</Link></li>
          <li><Link to='/top250'>Top 250</Link></li>
          <li><Link to='/popular'>Popular</Link></li>
          <li><Link to='/search'>Search</Link></li>
        </ul>

        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/watchlist' element={<Watchlist/>} />
          <Route path='/top250' element={<MovieList moviesData={top250MoviesData.items}/>} />
          <Route path='/popular' element={<MovieList moviesData={popMoviesData.items}/>} />
          <Route path='/search' element={<Search/>} />


        </Routes>

        </BrowserRouter>
    </div>
  );
}

export default App;
