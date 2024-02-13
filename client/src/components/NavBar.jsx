import React from 'react'
import { IoHomeSharp } from "react-icons/io5";
import { LuHistory } from "react-icons/lu";
import './NavBar.css'


export default function NavBar(){
    return(
        <nav className='nav-container'>
            <ul>
                <li>
                    <IoHomeSharp />
                    <a href='/home'>Home</a>
                </li>
                <li>
                    <LuHistory />
                    <a href='/history'>History</a>
                </li>
            </ul>
        </nav>
    );

}
