import { Button } from '@mui/material';


const DefaultButton = ({onClick, color, text}) => {
    return (
        <Button sx={{mt: 2, mb: 2}} variant="contained" color={color} onClick={onClick}>{text}</Button>
    )
}

export default DefaultButton