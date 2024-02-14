import React from 'react'
import '../assets/styling/StudyRoom.css';

export default function StudyRoom(props){
    const roomNumber = props.roomNumber;
    return(
        <div className='content-wrapper-rooms'>
            <button className='room-button'>
                {roomNumber}
                <div className='room-info'>
                    Info about Room
                    <button>
                        Click to Schedule
                    </button>
                </div>
            </button>
        </div>
    )
}