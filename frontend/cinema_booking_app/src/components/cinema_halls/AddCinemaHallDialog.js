import CustomDialog from "../CustomDialog"
import { useForm } from "react-hook-form";
import InputButton from "../buttons/InputButton"
import SubmitButton from "../buttons/SubmitButton"
import "../Form.css"

const AddCinemaHallDialog = ({onClose, onConfirm, open}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        onConfirm(data)
        onClose()
    }

    return (
        <CustomDialog title={"Add Cinema Hall"} open = {open}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className='form-text'>Name</label>
                <input type="text" className='form-field' {...register("name", {required: true})} />
                <br/>
                <label className='form-text'>Description</label>
                <input type="text" className='form-field' {...register("description", {required: true})} />
                <br/>
                <label className='form-text'>Numer of rows</label>
                <input type="text" className='form-field' {...register("rows", {required: true, pattern: "{0-9}+"})} />
                <br/>
                <label className='form-text'>Number of columns</label>
                <input type="text" className='form-field' {...register("columns", {required: true, pattern: "{0-9}+"})} />
                <br/>
                <SubmitButton value="Confirm" />
                <InputButton type="button" value="Close" onClick={onClose} />
            </form>
        </CustomDialog>
    )
}

export default AddCinemaHallDialog