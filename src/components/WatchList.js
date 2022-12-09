import { useCallback, useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collection, doc, getDocs, addDoc } from 'firebase/firestore';
import Movie from "./Movie";


const Watchlist = ({addMovie , deleteMovie}) => {

    const [myMovies, setMyMovies] = useState([]);
    const watchlistCollectionRef = collection(db,"watchlist") 

    // const fetchMyMovies = async () => {
    //     const data = await getDocs(watchlistCollectionRef);
    //     setMyMovies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // }

    const fetchMyMovies = useCallback(async () => {
        const data = await getDocs(watchlistCollectionRef);
        const response = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const unique = [...new Map(response.map(item => [item['imDb'], item])).values()]
        setMyMovies(unique);
    }, [collection])

    useEffect(() => {
        fetchMyMovies();
    },[fetchMyMovies]);

  

    return (
        <div className="watchlist-container">
            <h1>Your Watchlist</h1>
            
            <div className="movie-card-list"> 
                {myMovies.map((movie) => { 
                    return (
                    <Movie key={movie.imDb} movie={movie} addMovie = {addMovie} deleteMovie = {deleteMovie} />
                )})}
            </div>
        </div>
    )
}

export default Watchlist;

// // The useEffect has a dependency array that now is set to [fetchMyMovies]. 
// This means that every time the variable fetchMyMovies changes the useEffect will rerender. 
// Inside the useEffect set a new value to myMovies by the setMyMovies function. 
// Even if you get the same values returned from firebase regarding the current movies in db, 
// you still create a new array each time you read data. (querySnapshot.docs.map((doc)=> ({...doc.data(), id: doc.id})))
// . React only does a shallow comparison, meaning that the object reference has changed, 
// and therefore movies is different on each render.

// // First you need to decide when you want to run the useEffect and what should trigger it. 

// // One solution could be to move the functionality in your effect into its own function and wrap it in an useCallbac. 
// You can then call this function from an ´useEffect` on initial load, 
// and after that simply load the effect whenever you delete or add movies.