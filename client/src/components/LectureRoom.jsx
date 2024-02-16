import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import '../assets/styling/LectureRoom.css'

export default function LectureRoom(props){

    const roomNumber = props.roomNumber

    return(
        <div className='content-wrapper-lecrooms'>
            <button className='lecroom-button'>
                {roomNumber}
                <div className='lecroom-info'>
                    Info about Room
                    <button>
                        Click to Schedule
                    </button>
                </div>
            </button>
        </div>       
    );
}