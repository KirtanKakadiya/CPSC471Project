import React from 'react';
import '../assets/styling/Login.css';
import {useState} from'react';
import { FaUser} from "react-icons/fa";
import { IoMdKey } from "react-icons/io";
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUserDetails } from '../reducers/userSlice';

export default function LoginPage(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [successText, setSuccessText] = useState("");

    async function HandleLogin(event) {

        if(password === "" || email === ""){
            setSuccessText("Incorrect username or password");
            return;
        }
        event.preventDefault();
        var data = {};
        var error = null;
        const route =
          "http://localhost:7003/user/getuser?email=" +
          email +
          "&password=" +
          password;
        console.log(route);
        const response = await fetch(route, {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Content-Type": "application/json",
          },
          body: JSON.stringify()
        });
    
        if (response.status == 400) {
            setSuccessText(response.statusText);
        } else if (response.status == 500) {
            setSuccessText(response.statusText);
        } else if (response.status == 401) {
            setSuccessText(response.statusText);
        } else if (response.status == 200) {
            response.json().then((resData) => {
                console.log(resData.f_name, resData.l_name, resData.userType, resData.id);
                dispatch(setUserDetails({type: "LOG_IN", payload: {username: resData.f_name + " " + resData.l_name, userType: resData.userType, userID: resData.id}}))
                navigate("/home");
            })
        }
    }

    return(
        <div className='login-page'>
            <div className='wrapper'>
            <form onSubmit={HandleLogin}>
                <h1>Login</h1>
                <div className="input-box">
                    <input  value = {email} type="text" placeholder='Username' onChange={(event) => setUsername(event.target.value)} />
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