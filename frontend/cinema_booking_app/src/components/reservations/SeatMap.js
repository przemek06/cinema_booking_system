
// reservations - already taken seats (list of json objects in form: {seatRow: num, seatColumn: num})
// chosenSeats - seats chosen by the user (list of json objects in form: {row: num, column: num})
// setChosenSeats - update seats chosen by the user (delete or add new seat)
import React from 'react';
import "./SeatMap.css"

const SeatMap = ({ reservations, chosenSeats, setChosenSeats, rows, columns }) => {
    const handleClick = (seatRow, seatColumn, isReserved) => {
        if (isReserved) {
            return
        }
        
        const seat = { row: seatRow, column: seatColumn };
        const seatIndex = chosenSeats.findIndex (
        (chosenSeat) =>
            chosenSeat.row === seatRow && chosenSeat.column === seatColumn
        );

        if (seatIndex !== -1) {
        // Seat already chosen, remove it
        const updatedSeats = [...chosenSeats];
        updatedSeats.splice(seatIndex, 1);
        setChosenSeats(updatedSeats);
        } else {
        // Seat not chosen, add it
        setChosenSeats([...chosenSeats, seat]);
        }
    };

    return (
        <>
        <hr className='line'/>
        <div className="screen">Screen</div>
        <div className="seat-map">
            {Array.from({ length: rows }, (_, row) => (
            <div className="seat-row" key={`row-${row + 1}`}>
                <div className='row-no'>{row + 1}</div>
                {Array.from({ length: columns }, (_, column) => {
                const seatRow = row + 1;
                const seatColumn = column + 1;
                const isSelected = chosenSeats.some(
                    (chosenSeat) =>
                    chosenSeat.row === seatRow && chosenSeat.column === seatColumn
                );
                
                const isReserved = reservations.some(
                    (reservation) => {
    
                        return parseInt(reservation.seatRow, 10) === parseInt(seatRow, 10) && parseInt(reservation.seatColumn, 10) === parseInt(seatColumn, 10)
                    }
                );

                if (isReserved) {
                    console.log(seatRow)
                    console.log(seatColumn)
                    console.log("====================")

                }
                
                
                return (
                    <div
                    key={`seat-${seatRow}-${seatColumn}`}
                    className={`seat ${isSelected ? 'selected' : ''} ${
                        isReserved ? 'reserved' : ''
                    }`}
                    onClick={() => handleClick(seatRow, seatColumn, isReserved)}> {seatColumn} </div>
                );
                })}
                <div className='row-no'>{row + 1}</div>
            </div>
            ))}
        </div>
        </>
    );
};

export default SeatMap;