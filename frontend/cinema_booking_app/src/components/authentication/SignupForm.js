import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import "../Form.css"
import SubmitButton from '../buttons/SubmitButton';


export default function SignupForm({signUp}) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => signUp(data, navigate);
    const navigate  = useNavigate()
    console.log(errors);

    return (
        <div>
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
            <label className='form-text'>Email Address *</label>
            </div>
            <input className='form-field' type="email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
            <br/>
            <label className='form-text'>First Name *</label>
            <input className='form-field' type="text" {...register("First name", {required: true, maxLength: 80})} />
            <br/>
            <label className='form-text'>Last Name *</label>
            <input className='form-field' type="text" {...register("Last name", {required: true, maxLength: 100})} />
            <br/>
            <label className='form-text'>Password *</label>
            <input className='form-field' type="password" {...register("Password", {required: true, min: 8})} />
            <br/>
            <SubmitButton value="SIGN UP"/>
        </form>
        </div>
    );
}