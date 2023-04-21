import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const fieldStyle = {
    margin: '10px 0px 10px 0px',
    width: '100%'
  };
export default function SignupForm(signUp) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => signUp(data, navigate);
    const navigate  = useNavigate()
    console.log(errors);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label style={fieldStyle}>Sign up</label>
            <br/>
            <input style={fieldStyle} type="email" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
            <br/>
            <input style={fieldStyle} type="text" placeholder="First name" {...register("First name", {required: true, maxLength: 80})} />
            <br/>
            <input style={fieldStyle} type="text" placeholder="Last name" {...register("Last name", {required: true, maxLength: 100})} />
            <br/>
            <input style={fieldStyle} type="password" placeholder="Password" {...register("Password", {required: true, min: 8})} />
            <br/>
            <input type="submit" value="Sign up"/>
        </form>
    );
}