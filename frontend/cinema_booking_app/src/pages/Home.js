import {MovieCard} from "../components/movies/MovieCard";
import DateButtonList from "../components/calendar/DateButtonList";
import "./Style.css";
import { useState, useEffect } from "react";


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


const Home = () => {
    const initDate = new Date()
    initDate.setHours(0,0,0,0)
    const [chosenDate, setDate] = useState(initDate)
    const [movieCards, setMovieCards] = useState([])

    useEffect(() => {
        loadMovieCards(chosenDate, setMovieCards)
    }, [chosenDate]);

    return (
        <div className="body-container screenings-container">
            <h1>Now playing</h1>
            <DateButtonList chosenDate={chosenDate} setDate={setDate} />
            <MovieCardList movieCards={movieCards}/>
        </div>
    )
}

export default Home