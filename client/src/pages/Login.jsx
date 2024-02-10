import React from 'react'
import './Login.css';
import {useState,useRef} from'react'
import { FaUser} from "react-icons/fa";
import { IoMdKey } from "react-icons/io";


const EXAMPLE_USER = "student";
const EXAMPLE_PASS = "password";

export default function LoginPage(){

    const failedText = useRef();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [successText, setSuccessText] = useState("");

    

    const handleSubmit = (event) =>{
        if(username != EXAMPLE_USER || password != EXAMPLE_PASS){
            setSuccessText("Incorrect username or password");
        }
        else{
            setSuccessText("Successfully logged in")
        }

        event.preventDefault();
    }

    return(
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="input-box">
                    <input  value = {username} type="text" placeholder='Username' onChange={(event) => setUsername(event.target.value)} />
                    <FaUser className='login-icon'/>
                </div>
                <div className="input-box">
                    <input  value = {password} type="text" placeholder='Password' onChange={(event) => setPassword(event.target.value)}/>
                    <IoMdKey className='login-icon'/>
                </div>

                <button className='submit-login'>Login</button>
                <h2 className='on-fail'>{successText}</h2>
            </form>

        </div>
    );

}