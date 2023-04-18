import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import HourButton from "./HourButton"

const cardStyle = {
  backgroundColor: '#FEF5EF',
  border: "none"
}

const hourToButton = hour => <HourButton label={hour}></HourButton>
    

export function MovieCard({image, title, duration, description, hours}) {
  return (
    <Card className='movie-card' sx={{ display: 'flex' }} style={cardStyle} variant="outlined">
      <CardMedia
        component="img"
        sx={{ width: 168, height: 250}}
        image={image}
        alt="Movie poster"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column'}}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            <Link to="/movie/details">{title}</Link>
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" component="div">
            {duration} min
          </Typography>
          <Typography variant="body" component="div">
            {description}
          </Typography>
        </CardContent>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column'}}>
        <div className='hour-buttons'>
          {hours.map(hourToButton)}
        </div>
      </Box>
    </Card>
  );
}