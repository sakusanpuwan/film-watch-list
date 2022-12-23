import { collection, getDocs } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { db } from "../firebase-config";
import Movie from "./Movie";

const Home = ({ addMovie , deleteMovie}) => {

    const watchlistCollectionRef = collection(db,"watchlist") 

    const [myMovies, setMyMovies] = useState([]);
    const [randomMovie, setRandomMovie] = useState([]);

    const fetchMyMovies = useCallback(async () => {
        const data = await getDocs(watchlistCollectionRef);
        const response = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const unique = [...new Map(response.map(item => [item['imDb'], item])).values()]
        setMyMovies(unique);
    }, [collection])

    useEffect(() => {
        fetchMyMovies();
      },[])

    useEffect(() => {
        getRandomMovie()
    },[myMovies])


    const getRandomMovie = () => {
        let random_index = Math.floor(Math.random() * myMovies.length);
        let random_movie = myMovies[random_index];
        console.log(random_movie);
        setRandomMovie(random_movie);
    }

  

    return(
        <div className="home-container">
            <h1>Welcome to your movie app!</h1>
            <br/>
            
            <div className="home-random-movie-card">
                <h3>Your Random Movie Is</h3>
                { randomMovie && <Movie movie={randomMovie} addMovie={addMovie} deleteMovie={deleteMovie}/>}
            </div>
            
        </div>
    )
}

export default Home;