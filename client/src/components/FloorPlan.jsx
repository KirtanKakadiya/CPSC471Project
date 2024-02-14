import React from 'react'
import '../assets/styling/FloorPlan.css';
import StudyRoom from './StudyRoom';

export default function FloorPlan(){

    return(
        <div className='room-wrapper'>
            <div>
                <StudyRoom roomNumber = "Room 1" />
                <StudyRoom roomNumber = "Room 2" />
                <StudyRoom roomNumber = "Room 3" />
                <StudyRoom roomNumber = "Room 4" />
                <StudyRoom roomNumber = "Room 5" />
                <StudyRoom roomNumber = "Room 6" />
            </div>
        </div>
    )
}