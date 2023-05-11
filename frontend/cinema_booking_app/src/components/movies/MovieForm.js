import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import "../Form.css";
import SubmitButton from '../buttons/SubmitButton';


export default function MovieForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [inputCount, setInputCount] = useState(0);
    const [inputValues, setInputValues] = useState({});

    const addInput = () => {
        setInputCount(prevCount => prevCount + 1);
        setInputValues(prevValues => ({
            ...prevValues,
            [`character${inputCount + 1}`]: '',
            [`actor${inputCount + 1}`]: '',
        }));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const onSubmit = (data) => {
        // Perform form submission logic here
        data.characters = Object.values(inputValues);
        console.log(data);
        navigate('/'); // Example: Navigate to a different page after submission
    };

    return (
        <div>
        <h1>Add movie</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label className='form-text'>Title</label>
            <input className='form-field' type="text" {...register("Title", { required: true })} />
            <br />
            <label className='form-text'>Category</label>
            <input className='form-field' type="text" {...register("Category", { required: true })} />
            <br />
            <label className='form-text'>Overview</label>
            <textarea rows={5} className='form-field' {...register("Overview", { required: true })} />
            <br />
            <label className='form-text'>Description</label>
            <textarea rows={10} className='form-field' {...register("Description", { required: true })} />
            <br />
            <label className='form-text'>Image</label>
            <br />
            <input className='form-file' type="file" accept="image/png, image/jpeg" {...register("Image", { required: true })} />
            <br />
            <label className='form-text'>Duration</label>
            <input className='form-field' type="text" {...register("Duration", { required: true, pattern: "[0-9]+" })} />
            <br />
            <label className='form-text'>Characters</label>
            {Object.keys(inputValues).map((inputName, index) => {
            if (inputName.startsWith('character')) {
                const actorName = inputName.replace('character', 'actor');
                return (
                <div key={inputName}>
                    <label htmlFor={inputName}>Character: </label>
                    <input
                    className='small-field'
                    type="text"
                    name={inputName}
                    id={inputName}
                    value={inputValues[inputName]}
                    onChange={handleInputChange}
                    required
                    />
                    <label htmlFor={actorName}>Actor: </label>
                    <input
                    className='small-field'
                    type="text"
                    name={actorName}
                    id={actorName}
                    value={inputValues[actorName]}
                    onChange={handleInputChange}
                    required
                    />
                </div>
                );
            }
            return null;
            })}
            <button type="button" className='add-more' onClick={addInput}>Add character</button>
            <br />
            <SubmitButton value="ADD MOVIE"/>
            </form>
            </div>
        );
    }