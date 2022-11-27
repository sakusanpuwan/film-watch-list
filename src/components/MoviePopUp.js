import { useEffect, useState } from "react";

const MoviePopUp = ({movie,togglePopUp}) => {

    const [movieDetails,setMovieDetails] = useState([]);

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const fetchMovieDetails = async () => {
        await delay(5002)
        const response = await fetch(`https://imdb-api.com/en/API/Title/k_fxsv9nk9/${movie.id}/FullActor,FullCast,Posters,Images,Trailer,Ratings,Wikipedia,1`);
        const movieDetailsData = await response.json();
        setMovieDetails(movieDetailsData);
    }
    // k_fxsv9nk9
    // k_ttyuxc1j

    useEffect(() => {
        fetchMovieDetails();
    },[]);

    

    const actorImages = movieDetails.actorList.slice(0,6).map(actor => {
        return <img className="pop-up-actor" key={actor.id} src={actor.image} height="100" width="75"></img>
    });

    return (
        <div className="pop-up-container">
            {console.log(movieDetails)}
            <div className="overlay" onClick={togglePopUp}></div>
            <div className="pop-up">
                <div className="pop-up-header">
                    <h2>{movieDetails.fullTitle}   {movieDetails.runtimeStr}</h2>
                    <h3>{movieDetails.ratings.imDb}⭐ {movieDetails.ratings.metacritic}Ⓜ️ {movieDetails.ratings.rottenTomatoes}🍅 </h3>
                </div>
                <div className="pop-up-media">
                    <img src={movieDetails.image} height="300"></img>
                    <iframe className="pop-up-trailer" src={movieDetails.trailer.linkEmbed} />
                    <div className="pop-up-actors">
                        {actorImages}
                    </div>
                </div>
                <p className="pop-up-plot">
                    {movieDetails.plot}
                </p>
                <button className="close-pop-up" onClick={togglePopUp}>X</button>
            </div>
        </div>
        
    )
}

export default MoviePopUp;