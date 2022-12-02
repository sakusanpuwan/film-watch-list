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
                <img className="movie-card-poster" src={movie.image} height="300px" width="218.16px"></img> 
                
            </div>
            <div className="movie-card-overlay">
                <div className="movie-card-text">
                    <h3>{movie.title}</h3>
                    <h3>{movie.year ? movie.year : movie.description}</h3>
                    <h3>{movie.imDbRating ? movie.imDbRating : null}⭐</h3>
                </div>
            </div>

            {isOpen && <MoviePopUp key={movie.id} movie={movie} togglePopUp={togglePopUp} />}

        </div>
    )
}

export default Movie;