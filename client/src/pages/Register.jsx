import React from 'react';
import '../assets/styling/Register.css';
import { useState } from 'react';
import { FaUser} from "react-icons/fa";
import { IoMdKey } from "react-icons/io";
import {useNavigate} from 'react-router-dom'

export default function RegisterPage(){

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [successText, setSuccessText] = useState("");

    const handleSubmit = (event) =>{
        if(username === "" || password === "" || confirmPassword === "" || email === ""){
            setSuccessText("Missing field(s)");
        }
        else if(password!== confirmPassword){
            setSuccessText("Passwords do not match");
        }
        else{
            navigate("/");
            
        }

        event.preventDefault();
    }


    return(
        <div className='login-page'>
        <div className='wrapper'>
        <form onSubmit={handleSubmit}>
            <h1>Regsiter</h1>
            <div className="input-box">
                <input  value = {username} type="text" placeholder='Username' onChange={(event) => setUsername(event.target.value)} />
                <FaUser className='login-icon'/>
            </div>
            <div className="input-box">
                <input  value = {password} type="text" placeholder='Password' onChange={(event) => setPassword(event.target.value)}/>
                <IoMdKey className='login-icon'/>
            </div>
            <div className="input-box">
                <input  value = {confirmPassword} type="text" placeholder='Confirm Password' onChange={(event) => setConfirmPassword(event.target.value)} />
                <FaUser className='login-icon'/>
            </div>
            <div className="input-box">
                <input  value = {email} type="text" placeholder='Email' onChange={(event) => setEmail(event.target.value)}/>
                <IoMdKey className='login-icon'/>
            </div>

            <button className='submit-login'>Register</button>
            <h2 className='on-fail'>{successText}</h2>

        </form>
        </div>
    </div>
    );
}