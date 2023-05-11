import CustomDialog from "../CustomDialog"
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import InputButton from "../buttons/InputButton"
import SubmitButton from "../buttons/SubmitButton"
import "../Form.css"

const loadMovies = async (setMovies) => {
    let result = await fetch("http://localhost:8080/anon/movies", {
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
        setMovies(resultJSON);
      } else {
        console.log("Could not load more data.");
      }
}

const loadCinemaHalls = async (setHalls) => {
    let result = await fetch("http://localhost:8080/anon/halls", {
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
        setHalls(resultJSON);
      } else {
        console.log("Could not load more data.");
      }
}

const mapMovies = (moviesJSON) => {
    return moviesJSON.map(
        movieJSON => <option value={movieJSON["id"]}>{movieJSON["title"]}</option>
    )
}

const mapCinemaHalls = (cinemaHallsJSON) => {
    return cinemaHallsJSON.map(
        cinemaHallJSON => <option value={cinemaHallJSON["id"]}>{cinemaHallJSON["name"]}</option>
    )
}

const handleBadDate = (setBadDateError) => {
  setBadDateError(true)
}

const AddScreeningDialog = ({onClose, onConfirm, open}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [movies, setMovies] = useState([])
    const [halls, setHalls] = useState([])
    const [badDateError, setBadDateError] = useState(false)
    const onBadDate = () => handleBadDate(setBadDateError)
    const onSubmit = data => {
        setBadDateError(false)
        onConfirm(data, onClose, onBadDate)
    }

    useEffect(() => {
        loadMovies(setMovies)
        loadCinemaHalls(setHalls)
    }, []);

    return (
        <CustomDialog title={"Add Screening"} open = {open}>
            { badDateError ? <p style={{color: "red"}}>Cinema hall is not available at that time!</p> : <></>}

            <form onSubmit={handleSubmit(onSubmit)}>
                <label className='form-text'>Screening date</label>
                <input type="datetime-local" className='form-field' {...register("screeningDate", {required: true})} />
                <br/>
                <label className='form-text'>Base price</label>
                <input type="text" className='form-field' pattern="[0-9]+\.[0-9][0-9]" {...register("basePrice", {required: true, pattern: "[0-9]+\\.[0-9][0-9]"})} />
                <br/>
                <label className='form-text'>Choose movie to screen</label>
                <select className='form-field' {...register("movie", {required: true})}> 
                    {mapMovies(movies)}
                </select>
                <br/>
                <label className='form-text'>Choose the cinema hall</label>
                <select className='form-field' {...register("cinemaHall", {required: true})}> 
                    {mapCinemaHalls(halls)}
                </select>
                <br/>
                <SubmitButton value="Confirm" />
                <InputButton type="button" value="Close" onClick={onClose} />
            </form>
        </CustomDialog>
    )
}

export default AddScreeningDialog