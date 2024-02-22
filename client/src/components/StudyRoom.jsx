import React from 'react'
import '../assets/styling/StudyRoom.css';


export default function StudyRoom(props){
    const roomNumber = props.roomNumber
    const capacity = props.capacity
    const available = props.available

    return(
        <div >
            <button className={`room-button ${available === "true" ? 'green-background' : 'red-background'}`}>
                Study Room : {roomNumber}
                <div className='room-info'>
                    Capacity : {capacity}
                    <button className='button-schedule'>
                        Click to Schedule
                    </button>
                </div>
            </button>
        </div>
    )
}