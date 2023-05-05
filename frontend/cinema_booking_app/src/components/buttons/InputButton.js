import "./Buttons.css"

const InputButton = ({value, type, onClick}) => {
    return (
        <input type={type} className="form-button" value={value} onClick = {onClick}/>
    )
}

export default InputButton