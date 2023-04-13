import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const cardStyle = {
  backgroundColor: '#FEF5EF',
  borderRadius: 0,
  width: '60%'
}

export function MovieCard({image, title, duration, description}) {
  return (
    <Card sx={{ display: 'flex' }} style={cardStyle} variant="outlined">
      <CardMedia
        component="img"
        sx={{ width: 151, height: 250}}
        image={image}
        alt="Movie poster"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column'}}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {title}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" component="div">
            {duration}
          </Typography>
          <Typography variant="body" component="div">
            {description}
          </Typography>
        </CardContent>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column'}}>
        HourButtons
      </Box>
    </Card>
  );
}