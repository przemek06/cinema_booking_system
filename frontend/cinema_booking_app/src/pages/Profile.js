import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import DefaultButton from "../components/buttons/DefaultButton"
import "./Style.css";

const columns = [
    { field: 'col1', headerName: 'ID', width: 30 },
    { field: 'col2', headerName: 'Row', width: 40 },
    { field: 'col3', headerName: 'Column', width: 70 },
    { field: 'col4', headerName: 'Title', width: 200 },
    { field: 'col5', headerName: 'Time', width: 200 }
]

const mapRows = (rowsJSON) => {
    if (rowsJSON.length > 0) {
        return rowsJSON.map((json) => {
            return { 
                id: json["id"], 
                col1: json["id"], 
                col2: json["seatRow"], 
                col3: json["seatColumn"],
                col4: json["movieScreening"]["movie"]["title"],
                col5: json["movieScreening"]["screeningDate"]
            }
        })
    } else {
        return [{id: 1}]
    }
}

const loadReservations = async (setRows) => {
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
        setRows(resultJSON);
      } else {
        console.log("Could not load more data.");
      }
}

const onDeleteButtonClick = async (selected, setRows) => {
    const reservationIds = selected.map((id) => id);
  
    for (const id of reservationIds) {
      let result = await fetch(
        `http://localhost:8080/user/reservations/delete/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          mode: "cors",
          referrerPolicy: "no-referrer",
          origin: "http://localhost:3000/",
        }
      );
  
      if (result.status === 200) {
        console.log(`Successfully deleted reservation with ID: ${id}`);
      } else {
        console.log(`Failed to delete reservation with ID: ${id}`);
      }
    }
  
    loadReservations(setRows);
  };
  

const Profile = () => {
    const [rows, setRows] = useState([])
    const [selected, setSelected] = useState([])

    useEffect(() => {
        loadReservations(setRows)
    }, []);

    return (
        <div className="body-container screenings-container">
            <h1>Reservations</h1>
            <DefaultButton color="error" onClick={() => onDeleteButtonClick(selected, setRows)} text={"Delete"}/>
            <DataGrid
                rows={mapRows(rows)}
                columns={columns}
                paginationModel={{ page: 0, pageSize: 10 }}
                checkboxSelection
                onRowSelectionModelChange={setSelected}
            />
        </div>
    )
}

export default Profile