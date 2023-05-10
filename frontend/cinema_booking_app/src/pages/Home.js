import {MovieCard} from "../components/movies/MovieCard";
import DateButtonList from "../components/calendar/DateButtonList";
import DefaultButton from "../components/buttons/DefaultButton";
import "./Style.css";
import { useState, useEffect } from "react";
import AddScreeningDialog from "../components/movies/AddScreeningDialog";

const loadMovieCards = async (chosenDate, setMovieCards) => {
    let result = await fetch("http://localhost:8080/anon/screenings/"+chosenDate.getTime().toString(), {
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
        setMovieCards(resultJSON);
    } else {
        console.log("Could not load more data.");
    }
}

const mapDatesToHours = (dates) => {
    return dates.map(date => {
        const dateObject = new Date(date)
        const hours = dateObject.toLocaleTimeString('pl', {hour: '2-digit', minute:'2-digit'})
        return hours
    })
}

function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}

const MovieCardList = ({movieCards}) => {
    const movieGroups = groupBy(movieCards, card => card["movie"]["id"])

    return (
        <>
            {Array.from(movieGroups.keys()).map(key => {
                const group = movieGroups.get(key)
                const card = group[0]
                const hours = group.map(card => card["screeningDate"])
                return <MovieCard 
                    id={card["movie"]["id"]}
                    image={card["movie"]["image"]} 
                    title={card["movie"]["title"]} 
                    duration={card["movie"]["duration"]} 
                    description={card["movie"]["description"]} 
                    hours={mapDatesToHours(hours)}
                />
            })}
        </>
    )
}

const onClose = (setOpen) => {
    setOpen(false)
}

const onConfirm = async (formData, chosenDate, setMovieCards, onClose, onBadDate) => {
    let json = constructJSON(formData)

    let response = await fetch('http://localhost:8080/admin/screenings', { 
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
        console.log("success")
        onClose()
        loadMovieCards(chosenDate, setMovieCards) 
      } else if (response.status == 400) {
        console.log("Cinema hall not available at this moment")
        onBadDate()
      }
      else {
        // TODO popup about an error
        console.log("error")
      }
}

const constructJSON = (formData) => {
    return {
        "screeningDate": formData["screeningDate"].replace("T", " "),
        "basePrice": Number(formData["basePrice"]),
        "movie": {"id": Number(formData["movie"])},
        "cinemaHall": {"id": Number(formData["cinemaHall"])},
    }
}

const Home = ({isAdmin}) => {
    const initDate = new Date()
    initDate.setHours(0,0,0,0)
    const [chosenDate, setDate] = useState(initDate)
    const [movieCards, setMovieCards] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        loadMovieCards(chosenDate, setMovieCards)
    }, [chosenDate]);

    return (
        <div className="body-container screenings-container">
            <AddScreeningDialog onConfirm = {(formData, onClose, onBadDate) => onConfirm(formData, chosenDate, setMovieCards, onClose, onBadDate)} onClose = {() => onClose(setOpen)} open = {open}/>
            <h1>Now playing</h1>
            <DateButtonList chosenDate={chosenDate} setDate={setDate} />
            <MovieCardList movieCards={movieCards}/>
            { isAdmin ? <DefaultButton onClick = {() => setOpen(true)} color="success" text="Add screening"/> : <></> }
        </div>
    )
}

export default Home