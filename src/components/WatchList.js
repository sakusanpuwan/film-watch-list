import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collection, doc, getDocs } from 'firebase/firestore';
import Movie from "./Movie";


const Watchlist = () => {

    const [myMovies, setMyMovies] = useState([]);
    const watchlistCollectionRef = collection(db,"watchlist") 

    const fetchMyMovies = async () => {
        const data = await getDocs(watchlistCollectionRef);
        setMyMovies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    useEffect(() => {
        fetchMyMovies();
    })

    return (
        <div className="watchlist-container">
            <h1>Your Watchlist</h1>
            
            <div className="movie-card-list"> 
                {myMovies.map((movie) => { 
                    return (
                    <Movie key={movie.imDb} movie={movie} />
                )})}
            </div>
        </div>
    )
}

export default Watchlist;