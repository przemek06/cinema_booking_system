import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const buttonStyle = {
  margin: '10px 0',
  color: '#FEF5EF',
  backgroundColor: '#9D5C63',
  borderColor: '#9D5C63',
  borderRadius: 0
};

const DateButton = ({
    day, dateDay, month
}) => (
    <Button
    variant="outlined"
    className="btn btn-default"
    style={buttonStyle}
    >
    <Box sx={{ display: 'flex', flexDirection: 'column'}}>
      <Typography component="div" variant="subtitle">
            {day}
          </Typography>
          <Typography variant="h5" component="div">
            {dateDay}
          </Typography>
          <Typography variant="body" component="div">
            {month}
          </Typography>
    </Box>
  </Button>
);

export default DateButton;