import React, { useState, useEffect } from "react";
import "./Style.css";
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import DefaultButton from "../components/buttons/DefaultButton";
import { useNavigate } from "react-router-dom";

const image = (movieDetails) => movieDetails == null ? null : movieDetails["image"]
const title = (movieDetails) => movieDetails == null ? null : movieDetails["title"]
const category = (movieDetails) => movieDetails == null ? null : movieDetails["category"]
const duration = (movieDetails) => movieDetails == null ? null : movieDetails["duration"]
const actors = (movieDetails) => movieDetails == null ? [] : movieDetails["characters"].map(character=>character["actor"]["fullName"])
const overview = (movieDetails) => movieDetails == null ? null : movieDetails["overview"]
const description = (movieDetails) => movieDetails == null ? null : movieDetails["description"]

const makeListElement = actor => <li><Typography variant="subtitle2" color="text.secondary" component="div">{actor}</Typography></li>

const loadMovieDetails = async (id, setMovieDetails) => {

    let result = await fetch("http://localhost:8080/anon/movies/"+id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        mode: "cors",
        referrerPolicy: "no-referrer",
        origin: "http://localhost:3000/",
      });

    if (result.status === 200) {
        const resultJSON = await result.json();
        setMovieDetails(resultJSON);
        console.log("Success.");
    } else {
        console.log("Could not load data.");
    }
}

const deleteMovie = async (id, navigate) => {
    let result = await fetch("http://localhost:8080/admin/movies/delete/"+id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        mode: "cors",
        referrerPolicy: "no-referrer",
        origin: "http://localhost:3000/",
      });

    if (result.status === 200) {
        console.log("Success.");
        navigate("/")
        
    } else {
        console.log("Could not delete.");
        //TODO implement pls
    }
}

const MovieDetails = ({isAdmin}) => {

    const [movieDetails, setMovieDetails] = useState()
    const navigate = useNavigate()
    const location = useLocation();
    const state = location.state;

    useEffect(() => {
        loadMovieDetails(state["id"], setMovieDetails)
    }, []);

    return (
        <div className="body-container">
            <div className="main-container">
                <div className="movie-container">
                    <div className="image-container">
                        <CardMedia
                        component="img"
                        sx={{ width: 236, height: 350}}
                        image={image(movieDetails)}
                        alt="Movie poster"/>
                    </div>
                    <div className="overview-container">
                        <Typography component="div" variant="h5">
                            {title(movieDetails)}
                        </Typography>    
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                            {category(movieDetails)}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                            {duration(movieDetails)} min
                        </Typography>
                        <ul className="actors-ul">
                            {actors(movieDetails).map(makeListElement)}
                        </ul> 
                        <Typography variant="body" component="div">
                            {overview(movieDetails)}
                        </Typography>
                    </div>
                </div>
                <div className="description-container">
                    <p>
                        <Typography component="div" variant="h6">Description</Typography>
                        {description(movieDetails)}
                    </p>
                </div>
                { isAdmin ? <DefaultButton onClick = {() => deleteMovie(state["id"], navigate)} color="error" text="Delete"/> : <></> }
            </div>
        </div>
    );
}

export default MovieDetails