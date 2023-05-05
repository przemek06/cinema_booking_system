import React from 'react'
import DateButton from './DateButton'
import "./DateButtonList.css";


function days_list() {
    var days = [];
    for (var i = 0; i < 7; i++) {
        var day = new Date();
        day.setHours(0,0,0,0)
        day.setDate(day.getDate() + i);
        days.push(day)
    }
    return days
}

export default function DateButtonList({chosenDate, setDate}) {
    var days = days_list();
    return (
        <div className='outer-div'>
            <div className='inner-div' component="span">
                {days.map(day => {
                    const isChosen = chosenDate.getDate() == day.getDate()

                    return (
                        <DateButton day={day}
                                    onClick={(day) => setDate(day)}
                                    isChosen={isChosen}/>
                    )
                })}
            </div>
        </div>
    )
}