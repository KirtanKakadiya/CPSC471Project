import React from 'react'
import {useNavigate} from 'react-router-dom'
import { IconContext } from "react-icons";
import { IoHomeSharp } from "react-icons/io5";
import { BsEyeglasses } from "react-icons/bs";
import { MdOutlineClass } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import '../assets/styling/NavBar.css';
import Logo from "../assets/images/logo.png";
import ProfileImg from "../assets/images/profile-img.png";

export default function NavBar(){

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/");
    }


    return(
        <nav className='sidebar'>
            <div className='logo-sidebar'>
                <img className='logo-img' src= {Logo} alt=''/>
                <h1 className='logo-txt'>University Room Booking</h1>
            </div>

            <div>
                <ul>
                    <li className='sidebar-links'>
                            <IoHomeSharp className='sidebar-icons'/>
                            <a href='/home'>Home</a>
                        </li>
                        <li className='sidebar-links'>
                            <BsEyeglasses className='sidebar-icons'/>
                            <a href='/exploreclass'>Explore Rooms</a>
                        </li>
                        <li className='sidebar-links'>
                            <MdOutlineClass  className='sidebar-icons'/>
                            <a href='/discoverclass'>Discover Class</a>
                    </li>
                </ul>
            </div>
            
            <div className='sidebar-profile'>
                <img className='profile-img' src = {ProfileImg} alt='' />
                <div className='profile-content'>
                    <h2>FName and LName</h2>
                    <h2>Title of User</h2>
                </div>
                <IconContext.Provider value={{ className: "sidebar-logout" }}>
                    <BiLogOut size={60} onClick={handleLogout}/>
                </IconContext.Provider>
            </div>

        </nav>
    );

}
