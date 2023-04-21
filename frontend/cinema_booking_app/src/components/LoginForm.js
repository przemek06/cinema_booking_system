import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function LoginForm({signIn, setUser}) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate  = useNavigate()
    const onSubmit = data => signIn(data, setUser, navigate);
    console.log(errors);
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Sign in</label>
            <br/>
            <input type="email" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
            <br/>
            <input type="password" placeholder="Password" {...register("Password", {required: true, min: 8})} />
            <br/>
            <input type="submit" value="Sign in"/>
        </form>
    );
}