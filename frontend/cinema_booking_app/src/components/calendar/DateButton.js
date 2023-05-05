import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import "./DateButton.css";

const DateButton = ({
    day, onClick, isChosen
}) => {
	const color = isChosen ? "#824c51" : "#9D5C63"
	const colorStyle = {"background-color": color, "border-color": color}

	return (
		<Button className="date-button" onClick={() => onClick(day)} style={colorStyle}>
			<Box sx={{ display: 'flex', flexDirection: 'column'}} className='date-box'>
				<Typography component="div" variant="subtitle" className='date-typography'>
				{day.toLocaleDateString('en-us', {weekday: 'short'})}
				</Typography>
				<Typography variant="h5" component="div" className='date-typography'>
				{day.toLocaleDateString('en-us', {day: 'numeric'})}
				</Typography>
				<Typography variant="body" component="div" className='date-typography'>
				{day.toLocaleDateString('en-us', {month: 'long'})}
				</Typography>
			</Box>
		</Button>
	);
}

export default DateButton;