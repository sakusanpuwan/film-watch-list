import Movie from "./Movie";

const MovieList = ({moviesData}) => {

    const movieComponents = moviesData.items.map(movie => {
        return <Movie key={movie.id} movie={movie}/>
    })

    return (
        <>
        <h1>MovieList</h1>
        <div className="movie-card-list">
            {movieComponents}
        </div>
        </>
    )
}

export default MovieList;