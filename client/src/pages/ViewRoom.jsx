import React from 'react'
import '../assets/styling/ViewRoom.css'
import FloorPlan from '../components/FloorPlan';

export default function ViewRoom(){
    return(
        <div className='content-wrapper'>
            <FloorPlan />
        </div>
    );
}