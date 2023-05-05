import { Button } from '@mui/material';


const DefaultButton = ({onClick, color, text}) => {
    return (
        <Button variant="contained" color={color} onClick={onClick}>{text}</Button>
    )
}

export default DefaultButton