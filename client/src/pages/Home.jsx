import React from 'react'
import "../assets/styling/Home.css"
import { useLocation } from 'react-router-dom';

export default function HomePage(){
    const location = useLocation();
    return(
        <div className='home-content'>
            <h1>
                Home Page
            </h1>

        </div>
    );
}