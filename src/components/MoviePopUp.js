import { useEffect, useState } from "react";

const MoviePopUp = ({movie,togglePopUp}) => {

    const [movieDetails,setMovieDetails] = useState(null);

    // k_fxsv9nk9
    // k_ttyuxc1j

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`https://imdb-api.com/en/API/Title/k_fxsv9nk9/${movie.id}/FullActor,Trailer,Ratings,`);
                const data = await response.json();
                setMovieDetails(data);
                
            } catch (error) {
                console.log(error);
            }
        }
        fetchMovieDetails();
    },[]);



    const getActorImages = ((data) => {
        const actorImages= data.slice(0,6).map(actor => {
            return <img className="pop-up-actor" key={actor.id} src={actor.image} height="100" width="75"></img>
        })
        return actorImages
    })
    
    const getSimilarMovies = ((data) => {
        const similarMoviesImages = data.slice(0,6).map(movie => {
            return <img className="pop-up-sim-movie" key={movie.id} src={movie.image} height="100" width="75"></img>
        })
        return similarMoviesImages
    })

    // const actorImages = movieDetails.actorList.slice(0,6).map(actor => {
    //     return <img className="pop-up-actor" key={actor.id} src={actor.image} height="100" width="75"></img>
    // });


    // For the initial render (data is not fetched yet), it will be empty. so nested property would be undefined.

    return (
        <>
        {movieDetails ? (
                <div className="pop-up-container">
                    <div className="overlay" onClick={togglePopUp}></div>
                    <div className="pop-up">
                        <div className="pop-up-header">
                            <h2>{movieDetails.fullTitle}   {movieDetails.runtimeStr}</h2>
                            <h3>{movieDetails.imDbRating}⭐ {movieDetails.metacriticRating}Ⓜ️ {movieDetails.ratings.rottenTomatoes}🍅 </h3>
                        </div>
                        <div className="pop-up-media">
                            <img className="pop-up-poster" src={movieDetails.image} height="300"></img>
                            <iframe className="pop-up-trailer" src={`${movieDetails.trailer.linkEmbed}?autoplay=false&width=500`} width="500" height="300" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" frameborder="no" scrolling="no"/>
                            <div className="pop-up-actors">
                                {getActorImages(movieDetails.actorList)}
                            </div>
                            <div className="pop-up-sim-movies">
                                {getSimilarMovies(movieDetails.similars)}
                            </div>
                        </div>
                        <div className="pop-up-text">
                            <div className='pop-up-text-left'>
                                <p>{movieDetails.plot}</p>
                                <h4> Director: {movieDetails.directors}</h4>
                                <h4> Writers: {movieDetails.writers}</h4>
                                <h4> Stars: {movieDetails.stars}</h4>
                            </div>
                            <div className='pop-up-text-right'>
                                <div className='pop-up-genres'>
                                    <h4 >{movieDetails.genreList[0].value}</h4>
                                    <h4>{movieDetails.genreList[1].value}</h4>
                                
                                </div>
                                <div className='pop-up-money'>
                                    <h4> Budget: {movieDetails.boxOffice.budget}</h4>
                                    <h4> Gross: {movieDetails.boxOffice.cumulativeWorldwideGross}</h4>
                                </div>
                            </div>
                            <button className='pop-up-btn'>Add to watchlist!</button></div>
                        <button className="close-pop-up" onClick={togglePopUp}>X</button>
                    </div>
                </div>
        ) : null}
        </>

        
    )
};

export default MoviePopUp;