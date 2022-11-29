import { useEffect, useState } from 'react';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

import './App.css';
import Home from './components/Home';
import Top250 from './components/Top250';
import Watchlist from './components/WatchList';


function App() {

  const [moviesData,setMoviesData] = useState([]);

  const fetchMoviesData = async () => {
    const response = await fetch("https://imdb-api.com/en/API/Top250Movies/k_ttyuxc1j");
    const data = await response.json();
    setMoviesData(data);
  }

  useEffect(() => {
    fetchMoviesData();
  },[])

  return (
    <div className="App">
        <BrowserRouter>

        <ul className='navbar'>
        <li><Link to='/'>Home</Link></li>
          <li><Link to='/watchlist'>Watch List</Link></li>
          <li><Link to='/top250'>Top 250</Link></li>
        </ul>

        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/watchlist' element={<Watchlist/>} />
          <Route path='/top250' element={<Top250 moviesData={moviesData}/>} />

        </Routes>

        </BrowserRouter>
    </div>
  );
}

export default App;
