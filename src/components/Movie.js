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
                <h3>{movie.title}</h3>
                <h3>{movie.year}</h3>
            </div>
        </div>

        
        </div>
    )
}

export default Movie;