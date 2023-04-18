import React, { useState } from "react";
import "./Style.css";
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const image = "https://m.media-amazon.com/images/M/MV5BOTgyMWQ0ZWUtN2Q2MS00NmY0LWI3OWMtNjFkMzZlNDZjNTk0XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg"
const title = "Leon: The Professional"
const category = "Action/Crime/Drama"
const duration = 120
const actors = ["Jean Reno", "Gary Oldman", "Natalie Portman"]
const makeListEl = actor => <li><Typography variant="subtitle2" color="text.secondary" component="div">{actor}</Typography></li>
const overview = "12-year-old Mathilda is reluctantly taken in by Léon, a professional assassin, after her family is murdered. An unusual relationship forms as she becomes his protégée and learns the assassin's trade."
const description = <div><p>Léon is an Italian hitman (or "cleaner", as he refers to himself) in the Little Italy neighborhood of New York City working for a mafioso named "Old Tony". One day, Léon meets Mathilda Lando, a lonely twelve-year-old who lives with her dysfunctional family in an apartment down the hall from Léon, and has stopped attending class at her school for troubled girls. Mathilda's abusive father attracts the ire of corrupt DEA agents, who have been paying him to stash cocaine in his apartment. After they discover that he has been stealing the cocaine, DEA agents storm the building, led by their boss, the sharply dressed drug-addict Norman Stansfield. During the raid, Stansfield murders Mathilda's family while she is out shopping for groceries. When she returns, Mathilda realizes what has happened just in time to continue down the hall to Léon's apartment; he hesitantly gives her shelter.</p><p>Mathilda quickly discovers that Léon is a hitman. She begs him to take care of her and to teach her his skills, as she wants to avenge the murder of her four-year-old brother. At first, Léon is unsettled by her presence and considers murdering her in her sleep but he eventually trains Mathilda and shows her how to use various weapons. In exchange, she runs his errands, cleans his apartment and teaches him how to read. Mathilda looks up to Léon and quickly develops a crush on him, often telling him she loves him but he does not reciprocate.</p><p>When Léon is out on a job, Mathilda fills a bag with guns from Léon's collection and sets out to kill Stansfield. She bluffs her way into the DEA office by posing as a delivery girl, and is ambushed by Stansfield in a bathroom. One of his men arrives and informs him that Léon killed Malky, one of the corrupt DEA agents, in Chinatown that morning. Léon, after discovering her plan in a note left for him, rescues Mathilda, killing two more of Stansfield's men in the process. An enraged Stansfield confronts Tony, who is tortured for Léon's whereabouts.</p></div>


const MovieDetails = () => {
    return (
        <div className="body-container">
            <div className="main-container">
                <div className="movie-container">
                    <div className="image-container">
                        <CardMedia
                        component="img"
                        sx={{ width: 236, height: 350}}
                        image={image}
                        alt="Movie poster"/>
                    </div>
                    <div className="overview-container">
                        <Typography component="div" variant="h5">
                            {title}
                        </Typography>    
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                            {category}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                            {duration} min
                        </Typography>
                        <ul className="actors-ul">
                            {actors.map(makeListEl)}
                        </ul> 
                        <Typography variant="body" component="div">
                            {overview}
                        </Typography>
                    </div>
                </div>
                <div className="description-container">
                    <p>
                        <Typography component="div" variant="h6">Description</Typography>
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default MovieDetails