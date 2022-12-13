import { useEffect, useState } from 'react';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { db } from "./firebase-config";
import { collection, doc, getDocs, addDoc, deleteDoc, QuerySnapshot, DocumentSnapshot, onSnapshot, query, where , writeBatch } from 'firebase/firestore';
import './App.css';
import Home from './components/Home';
import MovieList from './components/MovieList';
import Search from './components/Search';
import Top250 from './components/Top250';
import Watchlist from './components/WatchList';
import { runTransaction } from "firebase/firestore";
import { async } from '@firebase/util';



function App() {

  const [top250MoviesData,setTop250MoviesData] = useState([]);
  const [popMoviesData,setPopMoviesData] = useState([]);
  
  const watchlistCollectionRef = collection(db,"watchlist") 

  const batch = writeBatch(db);




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

  // const titleQuery = query(watchlistCollectionRef, where("fullTitle","==","Se7en (1995)"))

  // const getData = () => {
  //   onSnapshot(titleQuery,(data) => {
  //     console.log(data.docs.map((item)=>{return item.data()}));
  //   })
  // }

  useEffect(() => {
    fetch250MoviesData();
    fetchPopMovieData();
    // getData();
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
    alert(`${movie.fullTitle} added`)
  };

  const deleteMovie = async(movie) => {
    const idQuery = query(watchlistCollectionRef, where('imDb', '==', movie.id));
    const docSnapshot = await getDocs(idQuery);
    const results = docSnapshot.docs
    docSnapshot.forEach((doc) => {
      deleteDoc(doc.ref)
    });


    // const idQuery = query(collection(db, 'watchlist'), where('imDd', '==', movie.id));
    // const docSnap = await getDocs(idQuery);
    // docSnap.forEach(doc => {
    //   batch.delete(doc.ref);
    // })
    // await batch.commit()

    // const idQuery = query(watchlistCollectionRef, where("imDb","==",movie.id));
    // idQuery.then(function(querySnapshot){
    //   querySnapshot.forEach(function(doc){
    //     doc.ref.delete()
    //   })
    // })

    alert(`${movie.fullTitle} deleted`);
  };

  // https://stackoverflow.com/questions/65862073/how-to-delete-documents-by-value-name




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
