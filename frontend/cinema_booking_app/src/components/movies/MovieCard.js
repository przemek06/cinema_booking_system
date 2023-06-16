import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import HourButton from "./HourButton"
import "./MovieCard.css"

const cardStyle = {
  backgroundColor: '#FEF5EF',
  border: "none",
  borderRadius: 0
}

const mapScreenings = (hours, screeningIds, onClick) => {
  return screeningIds.map((id, i) => {
    return (<HourButton label={hours[i]} onClick={() => onClick(id)}></HourButton>)
  })
}

export function MovieCard({id, image, title, duration, overview, hours, screeningIds, onButtonClick}) {
  return (
    <Card className='movie-card' sx={{ display: 'flex' }} style={cardStyle} variant="outlined">
      <CardMedia
        component="img"
        sx={{ width: 168, height: 250, margin: 1}}
        image={image}
        alt="Movie poster"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column'}}>
        <CardContent sx={{ flex: '0 0 auto' }}>
          <Typography component="div" variant="h5">
            <Link className='link' to="/movie/details" state={{"id": id}}>{title}</Link>
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" component="div">
            {duration} min
          </Typography>
          <Typography variant="body" component="div">
            {overview}
          </Typography>
        </CardContent>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', margin: 1}}>
        <div className='hour-buttons'>
          {mapScreenings(hours, screeningIds, onButtonClick)}
        </div>
      </Box>
    </Card>
  );
}