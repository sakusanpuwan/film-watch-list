import MovieList from "./MovieList";

const Top250 = ({moviesData}) => {

    return (
        <>
        <h1>Top250</h1>
        <MovieList moviesData={moviesData}/>
        </>
    )
}

export default Top250;