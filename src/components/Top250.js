import MovieList from "./MovieList";

const Top250 = ({ moviesData , addMovie , deleteMovie}) => {

    return (
        <div className="tab-movielist-container">
        <h1 className="tab-header">All Time Top 250 Movies</h1>
        <MovieList moviesData={moviesData} addMovie={addMovie} deleteMovie={deleteMovie}/>
        </div>
    )
}

export default Top250;