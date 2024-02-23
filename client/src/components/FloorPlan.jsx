import { useEffect, useState } from 'react';
import '../assets/styling/FloorPlan.css';
import LectureRoom from './LectureRoom';
import StudyRoom from './StudyRoom';





export default function FloorPlan(props){


    const  roomData = JSON.parse(props.roomData);
    const rooms = [];

    roomData.forEach((data) =>{
        switch(data.roomtype){
            case "Study Room":
                rooms.push(<StudyRoom key = {data.id} roomNumber = {data.roomnumber} capacity = {data.capacity} available = {data.available} />);
                break;
            case  "Lecture Hall":
                rooms.push(<LectureRoom key = {data.id} roomNumber = {data.roomnumber} capacity = {data.capacity} available = {data.available} />);
                break;
            default:
                console.log("Invalid room type");
        }
    })

    return(
        <div className='room-wrapper'>
            
            {rooms}
        </div>
    )
    // return(

    //     <div>


    //         <div className='room-wrapper'>
    //                 <StudyRoom roomNumber = "Room 1" bookedRoom = {false} />
    //                 <StudyRoom roomNumber = "Room 2" />
    //                 <StudyRoom roomNumber = "Room 3" />
    //                 <StudyRoom roomNumber = "Room 4" />
    //                 <LectureRoom roomNumber = "Lecture 1" />
    //                 <StudyRoom roomNumber = "Room 5" />
    //                 <StudyRoom roomNumber = "Room 6" />


    //         </div>
    //     </div>


    
}