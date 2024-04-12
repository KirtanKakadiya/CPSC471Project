import React from 'react'
import '../assets/styling/StudyRoom.css';
import { Link , useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function StudyRoom(props){
    const room = props.room;
    const roomNumber = props.roomNumber
    const capacity = props.capacity
    const available = props.available
    const date = props.date;
    const indPlugs = props.indPlugs;
    const board = props.board;
    const projector = props.projector;

    const navigate = useNavigate();

    const HandleSchedule= () =>{
        (available === "true") ? navigate(`/booking/${room}/${capacity}/${date}`) : toast.error("Room is not available");
        
    }

    return(
        <div className='content-wrapper-studyroom'>
            <button className={`room-button ${available === "true" ? 'green-background' : 'red-background'}`}>
                Study Room : {roomNumber}
                <div className='room-info'>
                    <p>Room Name: {room}</p>
                    <p>Capacity : {capacity}</p>
                    <p>Individual Plugins: {indPlugs === 1 ? "TRUE": "FALSE"}</p>
                    <p>Board : {board === 1 ? "TRUE": "FALSE"}</p>
                    <p>Projector : {projector === 1 ? "TRUE": "FALSE"}</p>
                    <button className='button-schedule' onClick={HandleSchedule}>
                        Click to Schedule
                    </button>
                    <ToastContainer/>
                </div>
            </button>
        </div>
    )
}