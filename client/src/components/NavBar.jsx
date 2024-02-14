import React from 'react'
import { IoHomeSharp } from "react-icons/io5";
import { LuHistory } from "react-icons/lu";
import '../assets/styling/NavBar.css';


export default function NavBar(){
    return(
        <nav className='sidebar'>
            <ul>
                <li className='sidebar-links'>
                    <IoHomeSharp className='sidebar-icons'/>
                    <a href='/home'>Home</a>
                </li>
                <li className='sidebar-links'>
                    <LuHistory />
                    <a href='/viewroom'>View Rooms</a>
                </li>
            </ul>
        </nav>
    );

}
