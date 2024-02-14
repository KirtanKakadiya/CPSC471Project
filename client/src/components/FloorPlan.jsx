import React from 'react'
import '../assets/styling/FloorPlan.css';
import LectureRoom from './LectureRoom';
import StudyRoom from './StudyRoom';

export default function FloorPlan(){

    return(
        <div className='room-wrapper'>
                <StudyRoom roomNumber = "Room 1" />
                <StudyRoom roomNumber = "Room 2" />
                <StudyRoom roomNumber = "Room 3" />
                <StudyRoom roomNumber = "Room 4" />
                <LectureRoom roomNumber = "Lecture 1" />
                <StudyRoom roomNumber = "Room 5" />
                <StudyRoom roomNumber = "Room 6" />
        </div>
    )
}