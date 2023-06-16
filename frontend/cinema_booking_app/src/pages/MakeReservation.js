import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import "./Style.css";
import SeatMap from "../components/reservations/SeatMap";
import Button from '@mui/material/Button';

const loadMovieScreening = async (id, setMovieScreening) => {

    let result = await fetch("http://localhost:8080/anon/screenings/" + id, {
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
    let result = await fetch("http://localhost:8080/anon/reservations/screening/" + id, {
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

const loadUserReservations = async (id, setReservedSeatsCount) => {
    let result = await fetch("http://localhost:8080/user/reservations", {
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
        const thisScreening = resultJSON.filter(reservation => reservation.movieScreening.id === id);
        const count = thisScreening.length;
        setReservedSeatsCount(count);
    } else {
        console.log("Could not load data.");
    }
}

const calculateTotalSeats = (chosenSeats) => chosenSeats.length

const calculatePrice = (basePrice, row, totalRows) => {
    return basePrice + basePrice * (totalRows - row) / totalRows
}

const calculateTotalPrice = (chosenSeats, movieScreening) => {
    if (movieScreening && movieScreening.cinemaHall) {
      const basePrice = movieScreening.basePrice;
      const totalRows = movieScreening.cinemaHall.rows;
      return chosenSeats.map(seat => calculatePrice(basePrice, seat.row, totalRows)).reduce((a, b) => a + b, 0);
    }
    return 0;
};

const constructJSON = (chosenSeats, movieScreening) => {
    const reservations = chosenSeats.map(seat => {
        return {
            seatRow: seat["row"],
            seatColumn: seat["column"],
            movieScreening: {
                "id": movieScreening["id"]
            }
        }
    })

    return { "reservations": reservations }
}

// TODO: error handling and empty input handling
const onConfirm = async (chosenSeats, movieScreening, navigate, setError) => {
    const json = constructJSON(chosenSeats, movieScreening)

    let response = await fetch('http://localhost:8080/user/reservations', {
        method: 'POST',
        body: JSON.stringify(json),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        mode: 'cors',
        referrerPolicy: 'no-referrer',
        origin: "http://localhost:3000/",
    });

    if (response.status == 200) {
        // loading pdf and opening in different page
        const blob = await loadPDF(await response.json())
        if (blob != null) {
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
        }
        navigate("/")
    } else {
        setError(true)
    }
}

const loadPDF = async (json) => {
    let response = await fetch('http://localhost:8080/user/reservations/pdf', {
        method: 'POST',
        body: JSON.stringify(json),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        mode: 'cors',
        referrerPolicy: 'no-referrer',
        origin: "http://localhost:3000/",
    });
    if (response.status == 200) {
        return await response.blob()
    } else {
        return null
    }

}

const MakeReservation = ({isUser}) => {
    const [reservedSeatsCount, setReservedSeatsCount] = useState(0);
    const [movieScreening, setMovieScreening] = useState()
    const [reservations, setReservations] = useState([])
    const [chosenSeats, setChosenSeats] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalSeats, setTotalSeats] = useState(0)
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const location = useLocation();
    const state = location.state;

    useEffect(() => {
        if (!isUser) {
            navigate("/")
        }
        let screeningId = state["id"]
        loadMovieScreening(screeningId, setMovieScreening)
        loadReservations(screeningId, setReservations)
        loadUserReservations(screeningId, setReservedSeatsCount)
    }, []);

    useEffect(() => {
        if (movieScreening != null) {
            setTotalPrice(calculateTotalPrice(chosenSeats, movieScreening))
            setTotalSeats(calculateTotalSeats(chosenSeats))
        }

    }, [chosenSeats, movieScreening]);

    return (
        <div className="body-container">
            <div className="main-container">
                <div class="centered-div">
                    {error ? <p style={{ color: "red" }}>Please select available seats from the seating map</p> : <></>}
                </div>
                <div className="summary-container">
                    <h2 className="movie-info">{movieScreening === undefined ? <></> : movieScreening.movie.title}</h2>
                    <h2 className="movie-info">{movieScreening === undefined ? <></> : movieScreening.screeningDate}</h2>
                    <h2 className="movie-info">Cinema hall: {movieScreening === undefined ? <></> : movieScreening.cinemaHall.id}</h2>
                    <div class="row">
                        <div class="left-text">Total seats</div>
                        <div class="right-text">{totalSeats}</div>
                    </div>
                    <div class="row">
                        <div class="left-text">Total price</div>
                        <div class="right-text">${totalPrice.toFixed(2)}</div>
                    </div>
                </div>
                {movieScreening === undefined ? <></> : <SeatMap  reservations={reservations} chosenSeats={chosenSeats} setChosenSeats={setChosenSeats} rows={movieScreening.cinemaHall.rows} columns={movieScreening.cinemaHall.columns} reservedSeatsCount={reservedSeatsCount} />}
                <div class="centered-div">
                    <Button
                        variant="outlined"
                        style={{margin: '10px', color: '#9D5C63', backgroundColor: '#FFFFFF', borderColor: '#9D5C63', borderRadius: 0 }}
                        onClick={() => onConfirm(chosenSeats, movieScreening, navigate, setError)} color={"success"} text={"Confirm"}
                    > Confirm </Button>
                </div>
            </div>
        </div>
    )
}

export default MakeReservation