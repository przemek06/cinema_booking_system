import React from 'react'
import DateButton from './DateButton'
import "./DateButtonList.css";


function days_list() {
    var days = [];
    for (var i = 0; i < 7; i++) {
        var day = new Date();
        day.setDate(day.getDate() + i);
        days.push(day)
    }
    return days
}

export default function DateButtonList() {
    var days = days_list();
    return (
        <div className='outer-div'>
            <div className='inner-div' component="span">
                {days.map(day => (
                    <DateButton day={day.toLocaleDateString('en-us', {weekday: 'short'})}
                                dateDay={day.toLocaleDateString('en-us', {day: 'numeric'})}
                                month={day.toLocaleDateString('en-us', {month: 'long'})}
                    />
                ))}
            </div>
        </div>
    )
}