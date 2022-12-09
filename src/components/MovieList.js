import Movie from "./Movie";

const MovieList = ({moviesData,addMovie,deleteMovie}) => {

    const movieComponents = moviesData.map(movie => {
        return <Movie key={movie.id} movie={movie} addMovie={addMovie} deleteMovie={deleteMovie}/>
    })

    return (
        <>
        <div className="movie-card-list">
            {movieComponents}
        </div>
        </>
    )
}

export default MovieList;