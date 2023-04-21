import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

  const buttonStyle = {
    margin: '10px 0px 10px 0px',
    backgroundColor: '#FFFFFF',
    borderColor: '#9D5C63',
    borderRadius: 0
  };

  const fieldStyle = {
    margin: '10px 0px 10px 0px',
    width: '100%'
  };

export default function LoginForm({signIn, setUser}) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate  = useNavigate()
    const onSubmit = data => signIn(data, setUser, navigate);
    console.log(errors);
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label style={fieldStyle}>Sign in</label>
            <br/>
            <input type="email" style={fieldStyle} placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
            <br/>
            <input type="password" style={fieldStyle} placeholder="Password" {...register("Password", {required: true, min: 8})} />
            <br/>
            <input type="submit" style={buttonStyle} value="Sign in"/>
        </form>
    );
}