import Movie from "./Movie";

const MovieList = ({moviesData,addMovie}) => {

    const movieComponents = moviesData.map(movie => {
        return <Movie key={movie.id} movie={movie} addMovie={addMovie}/>
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