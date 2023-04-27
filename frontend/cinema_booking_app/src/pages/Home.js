import {MovieCard} from "../components/MovieCard";
import DateButtonList from "../components/DateButtonList";
import "./Style.css";
import { useState } from "react";


const Home = () => {


    return (
        <div className="body-container screenings-container">
            <DateButtonList />
            <MovieCard image="https://m.media-amazon.com/images/M/MV5BOTgyMWQ0ZWUtN2Q2MS00NmY0LWI3OWMtNjFkMzZlNDZjNTk0XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg" title="Leon: The Professional" duration="120" description="12-year-old Mathilda is reluctantly taken in by Léon, a professional assassin, after her family is murdered. An unusual relationship forms as she becomes his protégée and learns the assassin's trade." hours={["13:00", "14:00", "15:00"]}/>
            <MovieCard image="https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg" title="Lord of the rings" duration="180" description="A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron." hours={["13:00", "14:00", "15:30", "18:30"]}/>
            <MovieCard image="https://images.moviesanywhere.com/de6092b467fc299fdf79a51dfa7f9710/12b877a3-28de-46ff-820f-dd8bf07e8edb.jpg" title="Harry Potter: Deathly Hallows" duration="200" description="As Harry, Ron and Hermione race against time and evil to destroy the Horcruxes, they uncover the existence of the three most powerful objects in the wizarding world: the Deathly Hallows." hours={["13:00", "14:30", "15:00", "15:30", "16:00"]}/>
        </div>
    )
}

export default Home