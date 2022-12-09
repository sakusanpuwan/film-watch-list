import { useEffect, useState } from "react";
import { Form, Navigate, useNavigate } from "react-router-dom";
import Movie from "./Movie";
import MovieList from "./MovieList";

const Search = ({deleteMovie,addMovie}) => {

    const [search,setSearch] = useState("");
    const [searchMovieDetails,setSearchMovieDetails] = useState([]);

    
    

    const fetchSearchDetails = async () => {
        const response = await fetch(`https://imdb-api.com/en/API/Search/k_ttyuxc1j/${search}`);
        const data = await response.json();
        setSearchMovieDetails(data)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchSearchDetails();
    }

    const handleChange = (event) => {
        setSearch(event.target.value)
    }


    return(
        <div className="search-container">
            <form onSubmit={handleSubmit} className="search-form" >
                <input placeholder="Search..." className="search-bar" type="text" onChange={handleChange} value={search}></input>
                <button className="search-submit-btn" type="submit">Submit</button>
            </form>
            <div className="movie-card-list">
                {searchMovieDetails.results && searchMovieDetails.results.map(movie => {
                    return <Movie key={movie.id} movie={movie} addMovie={addMovie} deleteMovie={deleteMovie} />
                })}
            </div>

        </div>
    )
}

export default Search;