import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import "../Form.css";
import SubmitButton from '../buttons/SubmitButton';
import InputButton from '../buttons/InputButton';


export default function MovieForm({onConfirm}) {
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
        data.characters = Object.values(inputValues);
        onConfirm(data, navigate)
    };

    return (
        <div>
        <h1>Add movie</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label className='form-text'>Title</label>
            <input className='form-field' type="text" {...register("title", { required: true })} />
            <br />
            <label className='form-text'>Category</label>
            <input className='form-field' type="text" {...register("category", { required: true })} />
            <br />
            <label className='form-text'>Overview</label>
            <textarea rows={5} className='form-field' {...register("overview", { required: true })} />
            <br />
            <label className='form-text'>Description</label>
            <textarea rows={10} className='form-field' {...register("description", { required: true })} />
            <br />
            <label className='form-text'>Image URL</label>
            <br />
            <input className='form-field
            ' type="text" {...register("image", { required: true })} />
            <br />
            <label className='form-text'>Duration</label>
            <input className='form-field' type="text" {...register("duration", { required: true, pattern: "[0-9]+" })} />
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
            })}
            <InputButton value="ADD CHARACTER" onClick={addInput}>Add character</InputButton>
            <br />
            <SubmitButton value="SUBMIT"/>
            </form>
            </div>
        );
    }