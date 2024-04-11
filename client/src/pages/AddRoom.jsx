import React, { useEffect, useState } from 'react'
import "../assets/styling/AddRoom.css"
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



export default function AddRoom(){
    const username = useSelector((state) => state.user.username)
    const userID = useSelector((state) => state.user.userID)
    const [roomType, setRoomType] = useState("");
    const [capacity, setCapacity] = useState("");
    const [roomName, setRoomName] = useState("");
    const [indplugs, setIndPlugs] = useState(null);
    const [board, setBoard] = useState(null);
    const [projector, setProjector] = useState(null);
    const [podiumid, setPodiumID] = useState(null);
    const [podiumPass, setPodiiumPass] = useState("");

    console.log(userID, "ID");

    async function HandleBooking(){

        if(roomType === "") {
            toast.error("Select Room Type");
            return;
        }

        const location = roomName.split(" ")[0];
        console.log(location);
        if(location != "SA" && location != "ENG" && location != "TFDL" && location != "ICT") {
            toast.error("Enter Valid Location");
            return;
        }
        else if(capacity === "") {
            toast.error("Enter Capacity");
            return;
        }
        
        switch(roomType) {
            case "Classroom":
                if(indplugs === null || board === null || projector == null) {
                    toast.error("Please enter all information");
                    return;
                }
                else{
                    const body = {
                        room: roomName,
                        username: userID,
                        capacity: capacity,
                        room_type : roomType,
                        indplugs: indplugs,
                        board: board,
                        projector: projector,
                    }

                    const response = await fetch("http://localhost:7003/room/addroom/class", {
                    method: "POST",
                    headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST",
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                    }
                    )
                    

                    if(response.status == 500){
                        toast.error(response.statusText);
                    }
                    else if(response.status == 401){
                        toast.error(response.statusText);
                    }
                    else if(response.status == 200){
                        toast.success("Room Created")
                    }
                    else{
                        toast.error(response.statusText);
                    }
                }
                break;
            case "Lecture Hall":
                if(indplugs === null || podiumPass === "" || podiumid == null) {
                    toast.error("Please enter all information");
                    return;
                }
                else{
                    const body = {
                        room: roomName,
                        username: 1,
                        capacity: capacity,
                        room_type : roomType,
                        indplugs: indplugs,
                        pid: podiumid,
                        ppass: podiumPass,
                    }

                    const response = await fetch("http://localhost:7003/room/addroom/lecture", {
                    method: "POST",
                    headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST",
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                    }
                    )
                    

                    if(response.status == 500){
                        toast.error(response.statusText);
                    }
                    else if(response.status == 401){
                        toast.error(response.statusText);
                    }
                    else{
                        toast.success("Room Created")
                    }
                }
                break;
            case "Conference Room":
                if(indplugs === null || board === null || projector == null) {
                    toast.error("Please enter all information");
                    return;
                }
                else{
                    const body = {
                        room: roomName,
                        username: 1,
                        capacity: capacity,
                        room_type : roomType,
                        indplugs: indplugs,
                        board: board,
                        projector: projector,
                    }

                    const response = await fetch("http://localhost:7003/room/addroom/conference", {
                    method: "POST",
                    headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST",
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                    }
                    )
                    

                    if(response.status == 500){
                        toast.error(response.statusText);
                    }
                    else if(response.status == 401){
                        toast.error(response.statusText);
                    }
                    else{
                        toast.success("Room Created")
                    }
                }
                break;
        }


        

        
    }
    // console.log(roomNumber, capacity, date);
    return(
        <div className='content-wrapper-addroom'>
            <h1 className='title'>
                Admin Add Room
            </h1>

            <div className='usertype'>
                <h2>Username: {username}</h2>
            </div>
            <div className='location-form-addbook'>
                <h2>Select Room Type</h2>
                <div className='form'>
                    <Box>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Room Type</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={roomType}
                            onChange={(event) =>setRoomType(event.target.value)}
                            >
                            <MenuItem value="Classroom">Classroom</MenuItem>
                            <MenuItem value="Lecture Hall">Lecture Hall</MenuItem>
                            <MenuItem value="Conference Room">Conference Room</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                
            </div>


            <div className='text-inline'>
                <h2 className='input-txt'>Capacity</h2>
                <input className = "input-val" type='number' placeholder='Please enter a capacity' value={capacity} onChange={(event) => setCapacity(event.target.value)} />
            </div>

            <div className='text-inline'>
                <h2 className='input-txt'>Room Name</h2>
                <input className = "input-val" placeholder = "Please enter a room name" value={roomName} onChange={(event) => setRoomName(event.target.value)} />
            </div>
            {roomType === "Classroom" || roomType === "Conference Room"? 
                <div>
                    <div className='location-form-addbook'>
                        <h2>Individual Plugins</h2>
                        <div className='form'>
                            <Box>
                                <FormControl fullWidth>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={indplugs}
                                    onChange={(event) =>setIndPlugs(event.target.value)}
                                    >
                                    <MenuItem value={1}>Yes</MenuItem>
                                    <MenuItem value={0}>No</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                    </div>
                    <div className='location-form-addbook'>
                        <h2>Board</h2>
                        <div className='form'>
                            <Box>
                                <FormControl fullWidth>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={board}
                                    onChange={(event) =>setBoard(event.target.value)}
                                    >
                                    <MenuItem value={1}>Yes</MenuItem>
                                    <MenuItem value={0}>No</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                    </div>
                    <div className='location-form-addbook'>
                        <h2>Projector</h2>
                        <div className='form'>
                            <Box>
                                <FormControl fullWidth>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={projector}
                                    onChange={(event) =>setProjector(event.target.value)}
                                    >
                                    <MenuItem value={1}>Yes</MenuItem>
                                    <MenuItem value={0}>No</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                    </div>
                </div>
                :(roomType === "Lecture Hall" ? 
                <div>
                    <div className='location-form-addbook'>
                        <h2>Individual Plugins</h2>
                        <div className='form'>
                            <Box>
                                <FormControl fullWidth>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={indplugs}
                                    onChange={(event) =>setIndPlugs(event.target.value)}
                                    >
                                    <MenuItem value={1}>Yes</MenuItem>
                                    <MenuItem value={0}>No</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                    </div>
                    <div className='text-inline'>
                        <h2 className='input-txt'>Podium Password</h2>
                        <input className = "input-val"value={podiumPass} onChange={(event) => setPodiiumPass(event.target.value)} />
                    </div>
                    <div className='text-inline'>
                        <h2 className='input-txt'>Podium ID</h2>
                        <input className = "input-val" value={podiumid} onChange={(event) => setPodiumID(event.target.value)} />
                    </div>

                    
                </div>
                :null)}
            <button className='confirm-booking' onClick= {HandleBooking}>
                Add Room
            </button>
            <ToastContainer/>
        </div>

    );

}