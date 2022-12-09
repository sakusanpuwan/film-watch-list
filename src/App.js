import { useEffect, useState } from 'react';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { db } from "./firebase-config";
import { collection, doc, getDocs, addDoc, deleteDoc } from 'firebase/firestore';
import './App.css';
import Home from './components/Home';
import MovieList from './components/MovieList';
import Search from './components/Search';
import Top250 from './components/Top250';
import Watchlist from './components/WatchList';
import { runTransaction } from "firebase/firestore";



function App() {

  const [top250MoviesData,setTop250MoviesData] = useState([]);
  const [popMoviesData,setPopMoviesData] = useState([]);
  
  const watchlistCollectionRef = collection(db,"watchlist") 


  const fetch250MoviesData = async () => {
    const response = await fetch("https://imdb-api.com/en/API/Top250Movies/k_fxsv9nk9");
    const data = await response.json();
    setTop250MoviesData(data);
  }

  const fetchPopMovieData = async () => {
    const response = await fetch("https://imdb-api.com/en/API/MostPopularMovies/k_fxsv9nk9");
    const data = await response.json();
    setPopMoviesData(data);
  }

  useEffect(() => {
    fetch250MoviesData();
    fetchPopMovieData();
  },[])


  // const addMovie = async (movie) => {
  //   await addDoc(watchlistCollectionRef,  {imDb:movie.id , imDbRating:movie.imDbRating , image:movie.image , fullTitle:movie.fullTitle });
  //   console.log(movie.fullTitle + "added to firestore");
  // }

  const addMovie = async(movie) => {
    const data = await getDocs(watchlistCollectionRef);
    const found = data.docs.some(doc => doc.imDb === movie.id);
    if (!found) {
      await addDoc(watchlistCollectionRef,  {imDb:movie.id , imDbRating:movie.imDbRating , image:movie.image , fullTitle:movie.fullTitle });
    }
  };

  const deleteMovie = async(movie) => {
    const movieDoc = doc(db,"watchlist",movie);
    await deleteDoc(movieDoc);
  };

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
          <Route path='/watchlist' element={<Watchlist addMovie={addMovie} deleteMovie={deleteMovie} />} />
          <Route path='/top250' element={<MovieList moviesData={top250MoviesData.items} addMovie={addMovie} deleteMovie={deleteMovie} />} />
          <Route path='/popular' element={<MovieList moviesData={popMoviesData.items} addMovie={addMovie} deleteMovie={deleteMovie}/>} />
          <Route path='/search' element={<Search addMovie={addMovie} deleteMovie={deleteMovie}/>} />


        </Routes>

        </BrowserRouter>
    </div>
  );
}

export default App;
