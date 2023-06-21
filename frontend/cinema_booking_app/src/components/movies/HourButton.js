import React from 'react';
import Button from '@mui/material/Button';

const buttonStyle = {
  margin: '0px',
  color: '#9D5C63',
  backgroundColor: '#FFFFFF',
  borderColor: '#9D5C63',
  borderRadius: 0
};

const HourButton = ({
    label,
    onClick,
    isUser
}) => {
  if (isUser) {
    return (<Button

    variant="outlined"
    className="btn btn-default"
    style={buttonStyle}
    onClick={onClick}
  >
    {label}
  </Button>)
  } else {
    return (<Button
    disabled
    variant="outlined"
    className="btn btn-default"
    style={buttonStyle}
    onClick={onClick}
  >
    {label}
  </Button>)
  }
}



export default HourButton;