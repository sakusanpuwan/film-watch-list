import MovieList from "./MovieList";

const Popular = ({ moviesData , addMovie , deleteMovie}) => {

    return (
        <div className="tab-movielist-container">
        <h1 className="tab-header">Current Popular Movies</h1>
        <MovieList moviesData={moviesData} addMovie={addMovie} deleteMovie={deleteMovie}/>
        </div>
    )
}

export default Popular;