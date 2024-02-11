import React from 'react'
import { useLocation } from 'react-router-dom';

export default function HomePage(){
    const location = useLocation();
    return(
        <div>
            {location.state.userName}
        </div>
    );
}