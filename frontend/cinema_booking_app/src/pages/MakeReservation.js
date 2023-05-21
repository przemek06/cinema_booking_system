import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import "./Style.css";

const loadMovieScreening = async (id, setMovieScreening) => {
    
    let result = await fetch("http://localhost:8080/anon/screenings/" + str(id), {
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
        console.log("Success.");
        const resultJSON = await result.json();
        setMovieScreening(resultJSON);
    } else {
        console.log("Could not load data.");
    }
}

const loadReservations = async (id, setReservations) => {
    let result = await fetch("http://localhost:8080/anon/reservations/screening/" + str(id), {
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
        console.log("Success.");
        const resultJSON = await result.json();
        setReservations(resultJSON);
    } else {
        console.log("Could not load data.");
    }
}

const MakeReservation = () => {
    const [movieScreening, setMovieScreening] = useState()
    const [reservations, setReservations] = useState([])
    const navigate = useNavigate()
    const location = useLocation();
    const state = location.state;

    useEffect(() => {
        let screeningId = state["id"]
        loadMovieScreening(screeningId, setMovieScreening)
        loadReservations(screeningId, setReservations)
    }, []);


    return (
        <div className="body-container">
            <div className="main-container">
                
            </div>
        </div>
    )
}