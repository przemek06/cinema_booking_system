import React from 'react';
import { useForm } from 'react-hook-form';
import "./Form.css"

export default function LoginForm({signIn, setUser}) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => signIn(data, setUser);
    console.log(errors);
    
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
            <input type="submit" className='form-button' value="SIGN IN"/>
        </form>
        <p>Don't have an account yet? <a href="/signup">SIGN UP</a></p>
      </div>
    );
}