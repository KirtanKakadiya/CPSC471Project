import { useEffect, useState } from 'react';
import '../assets/styling/FloorPlan.css';
import LectureRoom from './LectureRoom';
import StudyRoom from './StudyRoom';
import ConferenceRoom from './ConferenceRoom';




export default function FloorPlan(props){


    const  roomData = (props.roomData);
    const booking = (props.booking);
    const lcoations = props.locations;
    const date = props.date;
    let rooms = [];

    

    roomData.forEach((data) =>{
        
        const rdata = data.room_id.split(" ");
        if(rdata[0] === lcoations){
            console.log(data.room_id, "ROOMDATA");
            let flag = false;
            switch(data.room_type){
                case "Classroom":
                    if(booking != null){
                        booking.forEach((val)=>{
                            if(val.held_in == data.room_id){
                                flag = true
                                rooms.push(<StudyRoom key = {rdata[0]} roomNumber = {rdata[1]} capacity = {data.capacity} available = {"false"} date = {date} room = {data.room_id} indPlugs = {data.individual_plugins} board = {data.board_type} projector = {data.projector}/>);
                            }
                        })
                        
                    }
                    if(flag) break;
                    rooms.push(<StudyRoom key = {rdata[0]} roomNumber = {rdata[1]} capacity = {data.capacity} available = {"true"} date = {date} room = {data.room_id} indPlugs = {data.individual_plugins} board = {data.board_type} projector = {data.projector}/>);
                    break;
                case  "Lecture Hall":
                    if(booking !=null){
                        booking.forEach((val)=>{
                            if(val.held_in == data.room_id){
                                flag = true
                                rooms.push(<LectureRoom key = {rdata[0]} roomNumber = {rdata[1]} capacity = {data.capacity} available = {"false"} date = {date} room = {data.room_id} indPlugs = {data.individual_plugins} podimID = {data.podium_id} podiumPass = {data.podium_password}/>);
                            }
    
                        })
                        
                    }
                    if(flag) break;
                    rooms.push(<LectureRoom key = {rdata[0]} roomNumber = {rdata[1]} capacity = {data.capacity} available = {"true"} date = {date} room = {data.room_id} indPlugs = {data.individual_plugins} podimID = {data.podium_id} podiumPass = {data.podium_password}/>);
                    break;
                case "Conference room":
                    if(booking != null){
                        for(let val in booking){
                            if(val.held_in == data.room_id){
                                flag = true
                                rooms.push(<ConferenceRoom key = {rdata[0]} roomNumber = {rdata[1]} capacity = {data.capacity} available = {"false"} date = {date} room = {data.room_id} indPlugs = {data.individual_plugins} board = {data.board_type} projector = {data.projector}/>);
                            }
                        }
                    }
                    if(flag) break;
                    rooms.push(<ConferenceRoom key = {rdata[0]} roomNumber = {rdata[1]} capacity = {data.capacity} available = {"true"} date = {date} room = {data.room_id} indPlugs = {data.individual_plugins} board = {data.board_type} projector = {data.projector}/>);
                    break;
                default:
                    console.log("Invalid room type");
            }
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