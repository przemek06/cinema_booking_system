import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import "../Form.css";
import SubmitButton from '../buttons/SubmitButton';
import MultipleValueTextInput from 'react-multivalue-text-input';


export default function MovieForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    // const onSubmit = data => addMovie(data, navigate);
    const navigate  = useNavigate()
    console.log(errors);
    const characters = [];

    return (
        <div>
        <h1>Add movie</h1>
        <form onSubmit={null}>
            <label className='form-text'>Title</label>
            <input className='form-field' type="text" {...register("Title", {required: true})} />
            <br/>
            <label className='form-text'>Category</label>
            <input className='form-field' type="text" {...register("Category", {required: true})} />
            <br/>
            <label className='form-text'>Overview</label>
            <textarea rows={5} className='form-field' type="text" {...register("Overview", {required: true})} />
            <br/>
            <label className='form-text'>Description</label>
            <textarea rows={10} className='form-field' type="text" {...register("Description", {required: true})} />
            <br/>
            <label className='form-text'>Image</label>
            <br/>
            <input className='form-file' type="file" accept="image/png, image/jpeg" {...register("Image", {required: true})} />
            <br/>
            <label className='form-text'>Duration</label>
            <input className='form-field' type="text" {...register("Duration", {required: true, pattern: "[0-9]+"})} />
            <br/>
            <label className='form-text'>Characters</label>
            <MultipleValueTextInput
                className='form-field'
                onItemAdded={(item, allItems) => characters.push(item)}
                onItemDeleted={(item, allItems) => characters.splice(characters.indexOf(item), 1)}
                name="item-input"
                placeholder="Enter characters; separate them with COMMA or ENTER."
            />
            <br/>
            <SubmitButton value="ADD MOVIE"/>
        </form>
        </div>
    );
}