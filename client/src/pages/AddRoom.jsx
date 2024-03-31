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
    const [roomType, setRoomType] = useState("");
    const [capacity, setCapacity] = useState("");
    const [roomName, setRoomName] = useState("");
    const [indplugs, setIndPlugs] = useState(null);
    const [board, setBoard] = useState(null);
    const [projector, setProjector] = useState(null);
    const [podiumid, setPodiumID] = useState(null);
    const [podiumPass, setPodiiumPass] = useState("");

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
                        username: 1,
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

            <div>
                <h2>Username: {username}</h2>
            </div>
            <div className='location-form-addbook'>
                <h2>Select Room Type</h2>
                <Box width={500}>
                    <FormControl>
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


            <div>
                <h2>Capacity</h2>
                <input type='number' value={capacity} onChange={(event) => setCapacity(event.target.value)} />
            </div>

            <div>
                <h2>Room Name</h2>
                <input value={roomName} onChange={(event) => setRoomName(event.target.value)} />
            </div>
            {roomType === "Classroom" || roomType === "Conference Room"? 
                    <div className='location-form-addbook'>
                    <h2>Individual Plugins</h2>
                    <Box width={500}>
                        <FormControl>
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
                    <h2>Board</h2>
                    <Box width={500}>
                        <FormControl>
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
                    <h2>Projector</h2>
                    <Box width={500}>
                        <FormControl>
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

                :(roomType === "Lecture Hall" ? 
                    <div className='location-form-addbook'>
                    <h2>Individual Plugins</h2>
                    <Box width={500}>
                        <FormControl>
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
                    <h2>Podium Password</h2>
                    <input value={podiumPass} onChange={(event) => setPodiiumPass(event.target.value)} />
                    <h2>Podium ID</h2>
                    <input value={podiumid} onChange={(event) => setPodiumID(event.target.value)} />
                </div>
                :null)}
            <button className='confirm-booking' onClick= {HandleBooking}>
                Confirm your booking
            </button>
            <ToastContainer/>
        </div>

    );

}