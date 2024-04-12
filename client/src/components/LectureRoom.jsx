import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import '../assets/styling/LectureRoom.css'
import { Link , useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function LectureRoom(props){
    const room = props.room;
    const roomNumber = props.roomNumber
    const capacity = props.capacity
    const available = props.available
    const date = props.date;
    const indPlugs = props.indPlugs;
    const podiumID = props.podiumID;
    const podiumPass = props.podiumPass;
    const navigate = useNavigate();

    const HandleSchedule= () =>{
        (available === "true") ? navigate(`/booking/${room}/${capacity}/${date}`) : toast.error("Room is not available");
        
    }

    return(
        <div className='content-wrapper-lecrooms'>
            <button className={`room-button ${available === "true" ? 'green-background' : 'red-background'}`}>
                Lecture : {roomNumber}
                <div className='room-info'>
                    <p>Room Name: {room}</p>
                    <p>Capacity : {capacity}</p>
                    <p>Individual Plugins: {indPlugs === 1 ? "TRUE": "FALSE"}</p>
                    <p>Podium ID : {podiumID}</p>
                    <p>Podium Password : {podiumPass}</p>
                    <button className='button-schedule' onClick={HandleSchedule}>
                        Click to Schedule
                    </button>
                </div>
            </button>
        </div>       
    );
}