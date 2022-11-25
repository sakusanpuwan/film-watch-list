const MoviePopUp = ({movie,togglePopUp}) => {

    return (
        <div className="pop-up-container">
            <div className="overlay" onClick={togglePopUp}></div>
            <div className="pop-up">
                <h2>{movie.title}</h2>
                <p>Lorem ipsum</p>
                <button className="close-pop-up" onClick={togglePopUp}>X</button>
            </div>
        </div>
        
    )
}

export default MoviePopUp;