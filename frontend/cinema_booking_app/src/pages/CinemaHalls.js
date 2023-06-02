import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import AddCinemaHallDialog from "../components/cinema_halls/AddCinemaHallDialog"
import DefaultButton from "../components/buttons/DefaultButton"
import React from 'react';
import "./Style.css"

const columns = [
    { field: 'col1', headerName: 'ID', width: 50 },
    { field: 'col2', headerName: 'Hall name', width: 150 },
    { field: 'col3', headerName: 'No of rows', width: 100 },
    { field: 'col4', headerName: 'No of columns', width: 100},
    { field: 'col5', headerName: 'Description', width: 300 },
]

const mapRows = (rowsJSON) => {
    if (rowsJSON.length > 0) {
        return rowsJSON.map((json) => {
            return { id: json["id"], 
                col1: json["id"], 
                col2: json["name"], 
                col3: json["rows"],
                col4: json["columns"],
                col5: json["description"], 
            }
        })
    } else {
        return [{id: 1}]
    }
}

const loadCinemaHalls = async (setRows) => {
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
        setRows(resultJSON);
      } else {
        alert("Could not load more data.");
      }
}

const onDeleteButtonClick = async (selected, setRows) => {
    let jsonData = selected.map(id => {return {"id": id}})

    let result = await fetch("http://localhost:8080/admin/halls/delete", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
        mode: "cors",
        referrerPolicy: "no-referrer",
        origin: "http://localhost:3000/",
    
        body: JSON.stringify(jsonData)
      });
    
      if (result.status === 200) {
        console.log("Success.");
        loadCinemaHalls(setRows) 
      } else {
        alert("Could not delete.");
      }
}

const onClose = (setOpen) => {
    setOpen(false)
}

const onConfirm = async (formData, setRows) => {
    let json = constructJSON(formData)

    let response = await fetch('http://localhost:8080/admin/halls', { 
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
        loadCinemaHalls(setRows) 
      } else {
        alert("Could not add cinema hall.")
      }
}

const constructJSON = (formData) => {
    return {
        "name": formData["name"],
        "description": formData["description"],
        "rows": formData["rows"],
        "columns": formData["columns"],
    }
}

const CinemaHalls = () => {
    const [rows, setRows] = useState([])
    const [selected, setSelected] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        loadCinemaHalls(setRows)
    }, []);

    return (
        <div className="body-container screenings-container">
            <AddCinemaHallDialog onConfirm = {formData => onConfirm(formData, setRows)} onClose = {() => onClose(setOpen)} open = {open}/>
            <DefaultButton color="success" onClick={() => setOpen(true)} text={"Add hall"} />
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

export default CinemaHalls