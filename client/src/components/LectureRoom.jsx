import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import '../assets/styling/LectureRoom.css'

export default function LectureRoom(props){

    const roomNumber = props.roomNumber

    return(
        <div className='content-wrapper-lecrooms'>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
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