import React from 'react';
import '../assets/styling/Login.css';
import {useState} from'react';
import { FaUser} from "react-icons/fa";
import { IoMdKey } from "react-icons/io";
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUserDetails } from '../reducers/userSlice';


const EXAMPLE_USER = "student";
const EXAMPLE_PASS = "password";
const EXAMPLE_STUDENT = new Student(1234, "Alvin", "C.", "Munk");
export{ EXAMPLE_STUDENT }; 


export default function LoginPage(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [successText, setSuccessText] = useState("");


    const handleSubmit = (event) =>{
        if(username !== EXAMPLE_USER || password !== EXAMPLE_PASS){
            setSuccessText("Incorrect username or password");
        }
        else{
            dispatch(setUserDetails({type: "LOG_IN", payload: {username: "student", userType : "ADMIN"}}))
            navigate("/home", {state:{userName : username}});
            
        }

        event.preventDefault();
    }

    return(
        <div className='login-page'>
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
                <h2 className='register'>Not a member? <a href='/register'>Register</a></h2>
                <h2 className='on-fail'>{successText}</h2>

            </form>
            </div>
        </div>
        
    );

}