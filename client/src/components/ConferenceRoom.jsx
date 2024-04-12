import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import '../assets/styling/LectureRoom.css'
import { Link , useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ConferenceRoom(props){
    const room = props.room;
    const roomNumber = props.roomNumber
    const capacity = props.capacity
    const available = props.available
    const date = props.date;
    const navigate = useNavigate();

    const HandleSchedule= () =>{
        (available === "true") ? navigate(`/booking/${room}/${capacity}/${date}`) : toast.error("Room is not available");
        
    }

    return(
        <div className='content-wrapper-lecrooms'>
            <button className={`room-button ${available === "true" ? 'green-background' : 'red-background'}`}>
                Conference Room : {roomNumber}
                <div className='room-info'>
                    Room Number: {room}                     
                    Capacity : {capacity}
                    <button className='button-schedule' onClick={HandleSchedule}>
                        Click to Schedule
                    </button>
                </div>
            </button>
        </div>       
    );
}