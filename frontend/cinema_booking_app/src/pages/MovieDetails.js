import React, { useState, useEffect } from "react";
import "./Style.css";
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import DefaultButton from "../components/buttons/DefaultButton";
import { useNavigate } from "react-router-dom";
import ReviewInput from "../components/movies/ReviewInput"
import ReviewSection from "../components/movies/ReviewSection"

const image = (movieDetails) => movieDetails == null ? null : movieDetails["image"]
const title = (movieDetails) => movieDetails == null ? null : movieDetails["title"]
const category = (movieDetails) => movieDetails == null ? null : movieDetails["category"]
const duration = (movieDetails) => movieDetails == null ? null : movieDetails["duration"]
const actors = (movieDetails) => movieDetails == null ? [] : movieDetails["characters"].map(character => character["actor"]["fullName"])
const overview = (movieDetails) => movieDetails == null ? null : movieDetails["overview"]
const description = (movieDetails) => movieDetails == null ? null : movieDetails["description"]

const makeListElement = actor => <li><Typography variant="subtitle2" color="text.secondary" component="div">{actor}</Typography></li>

const loadMovieDetails = async (id, setMovieDetails, navigate) => {

    let result = await fetch("http://localhost:8080/anon/movies/" + id, {
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
        alert("Could not load data.");
        navigate("/")
    }
}

const deleteMovie = async (id, navigate) => {
    let result = await fetch("http://localhost:8080/admin/movies/delete/" + id, {
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
        alert("Could not delete.");
    }
}

const submitReview = async (review) => {
    let result = await fetch("http://localhost:8080/user/review", {
        method: "POST",
        body: JSON.stringify(review),
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
        window.location.reload(false);

    } else {
        alert("Couldn't submit the review")
    }
}

const loadReviews = async (movieId, setReviews) => {
    let result = await fetch("http://localhost:8080/anon/review/movie/" + movieId, {
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
        setReviews(resultJSON);
        console.log("Success.");
    } else {
        alert("Could not load reviews.");
    }
}

const deleteReview = async (id) => {
    let result = await fetch("http://localhost:8080/user/review/delete/" + id, {
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
        window.location.reload(false);

    } else {
        alert("Could not delete.");
    }
}

const calculateRating = (reviews) => reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length

const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} style={{ color: 'yellow', textShadow: '0px 0px 1px black', display: 'inline-block', marginRight: '2px'}}>&#9733;</span>);
      } else {
        stars.push(<span key={i} style={{ color: 'black', display: 'inline-block', marginRight: '2px'}}>&#9734;</span>);
      }
    }
    return stars;
  };
  

const loadUserId = async (setUserId) => {
    let result = await fetch("http://localhost:8080/anon/id", {
        method: "GET",
        credentials: "include",
        mode: "cors",
        referrerPolicy: "no-referrer",
        origin: "http://localhost:3000/",
    });

    if (result.status === 200) {
        const id = await result.text();
        setUserId(id);
    }
}   

const alreadyReviewed = (reviews, userId) => {
    return reviews.some(r => r.user.id == userId)
}

const MovieDetails = ({ isAdmin, isUser }) => {

    const [movieDetails, setMovieDetails] = useState()
    const [reviews, setReviews] = useState([])
    const [userId, setUserId] = useState(-1)
    const navigate = useNavigate()
    const location = useLocation();
    const state = location.state;

    useEffect(() => {
        loadMovieDetails(state["id"], setMovieDetails, navigate)
        loadReviews(state["id"], setReviews)
        loadUserId(setUserId)
    }, []);

    return (
        <div className="body-container">
            <div className="main-container">
                <div className="movie-container">
                    <div className="image-container">
                        <CardMedia
                            component="img"
                            sx={{ width: 236, height: 350 }}
                            image={image(movieDetails)}
                            alt="Movie poster" />
                    </div>
                    <div className="overview-container">
                        <Typography component="div" variant="h5">
                            {title(movieDetails)}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                            {category(movieDetails)}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                            {renderStars(calculateRating(reviews))}
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
                <div className="sub-container">
                    {isAdmin ? <DefaultButton onClick={() => deleteMovie(state["id"], navigate)} color="error" text="Delete" /> : <></>}
                    {isUser && movieDetails != null && !alreadyReviewed(reviews, userId) ? <ReviewInput onSubmit={submitReview} movieId={movieDetails.id} /> : <></>}

                    <ReviewSection reviews={reviews} userId={userId} deleteReview={deleteReview} />
                </div>
            </div>
        </div>
    );
}

export default MovieDetails