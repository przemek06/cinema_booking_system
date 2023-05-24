import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import "../Form.css"
import SubmitButton from '../buttons/SubmitButton';

export default function LoginForm({signIn, setUser}) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate  = useNavigate()
    const onSubmit = data => signIn(data, setUser, navigate);
    
    return (
      <div>
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label className='form-text'>Email Address *</label>
            <input type="email" className='form-field' {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
            <br/>
            <label className='form-text'>Password *</label>
            <input type="password" className='form-field' {...register("Password", {required: true, min: 8})} />
            <br/>
            <SubmitButton value="SIGN IN"/>
        </form>
        <p>Don't have an account yet? <a href="/signup">SIGN UP</a></p>
      </div>
    );
}