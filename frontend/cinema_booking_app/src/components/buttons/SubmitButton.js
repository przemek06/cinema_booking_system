import "./Buttons.css"

const SubmitButton = ({value}) => {
    return (
        <input type="submit" className="form-button" value={value}/>
    )
}

export default SubmitButton