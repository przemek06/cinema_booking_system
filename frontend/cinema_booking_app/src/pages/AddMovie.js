import { useState } from "react";
import MovieForm from "../components/movies/MovieForm";
import "./Style.css";

const mapCharacters = (characters) => {
    let character_objects = []

    for (let i = 0; i < characters.length/2; i++) {
        const index1 = 2 * i
        const index2 = index1 + 1
        const character = {
            "name": characters[index1],
            "actor": {
                "fullName": characters[index2]
            }
        }

        character_objects.push(character)
    }

    return character_objects
}

const constructJSON = (data) => {
    return {
        'title': data['title'],
        'category': data['category'],
        'overview': data['overview'],
        'description': data['description'],
        'image': data['image'],
        'duration': data['duration'],
        'characters': mapCharacters(data['characters'])
    }     
}

const onConfirm = async (data, navigate, setError) => {
    const json = constructJSON(data)

    let response = await fetch('http://localhost:8080/admin/movies', { 
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
        navigate("/")
        console.log("success")
      } else {
        setError(true)
        console.log("error")
      }
}

const AddMovie = () => {
    const [error, setError] = useState(false)

    return (
        <div className="body-container screenings-container">
            { error ? <p style={{color: "red"}}>There was an error!</p> : <></>}
            <MovieForm onConfirm={(data, navigate) => onConfirm(data, navigate, setError)}/>
        </div>
    )
}

export default AddMovie