import { useEffect, useState } from "react";

const MoviePopUp = ({movie,togglePopUp}) => {

    const [movieDetails,setMovieDetails] = useState(null);

    // k_fxsv9nk9
    // k_ttyuxc1j

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`https://imdb-api.com/en/API/Title/k_ttyuxc1j/${movie.id}/FullActor,Trailer,Ratings,`);
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
        const similarMoviesImages = data.map(movie => {
            return <img className="pop-up-sim-movies" key={movie.id} src={movie.image} height="100" width="75"></img>
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
                            <h3>{movieDetails.imDbRating}⭐ {movieDetails.metacriticRating}Ⓜ️ </h3>
                        </div>
                        <div className="pop-up-media">
                            <img src={movieDetails.image} height="300"></img>
                            <iframe className="pop-up-trailer" src={movieDetails.trailer.linkEmbed} />
                            <div className="pop-up-actors">
                                {getActorImages(movieDetails.actorList)}
                            </div>
                        </div>
                        <p className="pop-up-plot">
                            {movieDetails.plot}
                        </p>
                        <di>
                            {getSimilarMovies(movieDetails.similars)}
                        </di>
                        <button className="close-pop-up" onClick={togglePopUp}>X</button>
                    </div>
                </div>
        ) : null}
        </>

        
    )
};

export default MoviePopUp;