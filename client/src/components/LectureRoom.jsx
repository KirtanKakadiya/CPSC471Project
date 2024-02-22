import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import '../assets/styling/LectureRoom.css'

export default function LectureRoom(props){

    const roomNumber = props.roomNumber
    const capacity = props.capacity
    const available = props.available

    console.log(roomNumber);

    return(
        <div className='content-wrapper-lecrooms'>
            <button className={`room-button ${available === "true" ? 'green-background' : 'red-background'}`}>
                Lecture : {roomNumber}
                <div className='lecroom-info'>
                    Capacity : {capacity}
                    <button className='button-schedule'>
                        Click to Schedule
                    </button>
                </div>
            </button>
        </div>       
    );
}