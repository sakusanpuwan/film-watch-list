import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { auth, db } from "./firebase-config";
import { collection, doc, getDocs, addDoc, deleteDoc, QuerySnapshot, DocumentSnapshot, onSnapshot, query, where , writeBatch } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import './App.css';
import Home from './components/Home';
import MovieList from './components/MovieList';
import Search from './components/Search';
import Watchlist from './components/WatchList';
import Account from './components/Account';
import Top250 from './components/Top250';
import Popular from './components/Popular';





function App() {

  const [top250MoviesData,setTop250MoviesData] = useState([]);
  const [popMoviesData,setPopMoviesData] = useState([]);
  const [myMovies, setMyMovies] = useState([]);

  
  const watchlistCollectionRef = collection(db,"watchlist") 
  




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

  const fetchMyMovies = useCallback(async () => {
    const data = await getDocs(watchlistCollectionRef);
    const response = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const unique = [...new Map(response.map(item => [item['imDb'], item])).values()]
    setMyMovies(unique);
  }, [collection])

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
    fetchMyMovies();
    // onAuthStateChanged(auth,(currentUser) => {
    //   setUser(currentUser);
    // })
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
      alert(`${movie.fullTitle} has been added`);
    } else{
      alert(`${movie.fullTitle} has already been added`);
    }
    
  };

  const deleteMovie = async(movie) => {
    const idQuery = query(watchlistCollectionRef, where('imDb', '==', movie.id));
    const docSnapshot = await getDocs(idQuery);
    docSnapshot.forEach((doc) => {
      deleteDoc(doc.ref)
    });

    alert(`${movie.fullTitle} has been deleted`);
  };

  const register = async (registerEmail,registerPassword) => {
    try {
      const user = await createUserWithEmailAndPassword(auth,registerEmail,registerPassword);
    } catch (error) {
      console.log(error.message);
    }
  }

  const logout = async () => {
    await signOut(auth)
  }

  const login = async(email,password) => {
    try {
      const user = await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
      console.log(error.message);
    }
  }



  return (
    <div className="App">
        <BrowserRouter>

        <ul className='navbar'>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/watchlist'>Watch List</Link></li>
          <li><Link to='/top250'>Top 250</Link></li>
          <li><Link to='/popular'>Popular</Link></li>
          <li><Link to='/search'>Search</Link></li>
          {/* <li><Link to='/account'>Account</Link></li> */}
        </ul>

        <Routes>
          <Route path='/' element={<Home addMovie={addMovie} deleteMovie={deleteMovie}/>} />
          <Route path='/watchlist' element={<Watchlist moviesData={myMovies} addMovie={addMovie} deleteMovie={deleteMovie} />} />
          <Route path='/top250' element={<Top250 moviesData={top250MoviesData.items} addMovie={addMovie} deleteMovie={deleteMovie} />} />
          <Route path='/popular' element={<Popular moviesData={popMoviesData.items} addMovie={addMovie} deleteMovie={deleteMovie}/>} />
          <Route path='/search' element={<Search addMovie={addMovie} deleteMovie={deleteMovie}/>} />
          {/* <Route path='/account' element={<Account register={register} user={user} logout={logout} login={login} />} /> */}


        </Routes>

        </BrowserRouter>
    </div>
  );
}

export default App;
