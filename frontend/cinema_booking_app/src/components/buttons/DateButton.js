import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import "./DateButton.css";

const DateButton = ({
    day, dateDay, month
}) => (
	<Button className="date-button">
		<Box sx={{ display: 'flex', flexDirection: 'column'}} className='date-box'>
			<Typography component="div" variant="subtitle" className='date-typography'>
			{day}
			</Typography>
			<Typography variant="h5" component="div" className='date-typography'>
			{dateDay}
			</Typography>
			<Typography variant="body" component="div" className='date-typography'>
			{month}
			</Typography>
		</Box>
	</Button>
);

export default DateButton;