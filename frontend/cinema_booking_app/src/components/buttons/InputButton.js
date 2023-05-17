import "./Buttons.css"

const InputButton = ({value, onClick}) => {
    return (
        <input type='button' className="form-button" value={value} onClick = {onClick}/>
    )
}

export default InputButton