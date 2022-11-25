import { useState } from "react";
import MoviePopUp from "./MoviePopUp";

const Movie = ({movie}) => {

    const [isOpen,setIsOpen] = useState(false);

    const togglePopUp = () => {
        setIsOpen(!isOpen);
    }

    if(isOpen) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <div className="movie-card-container" onClick={togglePopUp}>
        
            <div className="movie-card">
                <h3>{movie.rank}.</h3>
                <img src={movie.image} height="300px"></img> 
                <h3>{movie.imDbRating}⭐</h3>
            </div>
            <div className="movie-card-overlay">
                <div className="movie-card-text">
                    <h3>{movie.title}</h3>
                    <h3>{movie.year}</h3>
                </div>
            </div>

            {isOpen && <MoviePopUp movie={movie} togglePopUp={togglePopUp}/>}

        </div>
    )
}

export default Movie;