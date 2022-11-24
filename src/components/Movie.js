const Movie = ({movie}) => {

    
    return (
        <div className="movie-card-container">
        
        <div className="movie-card">
            <h3>{movie.rank}.</h3>
            <img src={movie.image} height="300px"></img> 
            <h3>{movie.imDbRating}⭐</h3>
        </div>
        <div className="movie-card-overlay">
            <div className="movie-card-text">
                {movie.title}
                {movie.year}
            </div>
        </div>

        
        </div>
    )
}

export default Movie;