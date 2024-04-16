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
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';



export default function AdminAddUsers(){
    const username = useSelector((state) => state.user.username)
    const userID = useSelector((state) => state.user.userID)
    const [userType, setUserType] = useState(null);
    const [fName, setFName] = useState(null);
    const [mName, setMName] = useState(" ");
    const [lName, setLName] = useState(null);
    const [email, setEmail] = useState(null);
    const [pass, setPass] = useState(null);
    const [phone, setPhone] = useState(" ");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [days, setDays] = useState(null);
    const [heldIn, setHeldIn] = useState(null);
    const [rooms, setRooms] = useState(null);

    const onDateChangeStart=(newDate)=>{
        const formattedTime = dayjs(newDate).format('HH:00:00');
        console.log(formattedTime); // Output: e.g., "14:00:00"
        setStart(formattedTime);
    };

    const onDateChangeEnd=(newDate)=>{
        const formattedTime = dayjs(newDate).format('HH:00:00');
        console.log(formattedTime); // Output: e.g., "14:00:00"
        setEnd(formattedTime);
    };

    async function addStudent(){
        const body = {
            f_name: fName,
            m_name: mName,
            l_name: lName,
            phone_number: phone,
            email: email,
            password: pass
        }
        const response = await fetch("http://localhost:7003/user/adminadduserstudent", {
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
            toast.success("User Created")
        }
    }

    async function addAdmin(){

        const body = {
            f_name: fName,
            m_name: mName,
            l_name: lName,
            phone_number: phone,
            email: email,
            password: pass
        }
        const response = await fetch("http://localhost:7003/user/adminadduseradmin", {
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
            toast.success("User Created")
        }
    }

    async function addProfessor(){
        if(start == "" || end == "" || days == null || heldIn ==null){
            toast.error("Please enter all fields");
            return;
        }

        const body = {
            f_name: fName,
            m_name: mName,
            l_name: lName,
            phone_number: phone,
            email: email,
            password: pass,
            start: start,
            end: end,
            days: days,
            held_in: heldIn
        }
        const response = await fetch("http://localhost:7003/user/adminadduserprofessor", {
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
            toast.success("User Created")
        }
    }

    const HandleSubmit  = () => {
        if(fName == null || lName == null || email == null || pass == null){
            toast.error("Please Enter all fields")
            return;
        }

        if(userType == "Student"){
            addStudent();
        }
        else if(userType == "Admin"){
            addAdmin();
        }
        else if(userType == "Professor")
        {
            addProfessor();
        }

    }

    useEffect(()=>{
        async function RoomData(){
            const route = "http://localhost:7003/room/viewroom";
            const response = await fetch(route , {
                method: "GET",
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods": "GET",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(),
            });
            if(response.status == 500){
                toast.error(response.statusText);
            }
            else if(response.status == 401){
                toast.error(response.statusText);
            }
            else{
                response.json().then(response => setRooms(response));
            }
            
            console.log(rooms)
        }
        RoomData();


    }, []);

    
    return(
        <div className='content-wrapper-addroom'>
            <h1 className='title'>
                Admin Add Users
            </h1>

            <div className='usertype'>
                <h2>Username: {username}</h2>
            </div>
            <div className='location-form-addbook'>
                <h2>Select User Type</h2>
                <div className='form'>
                    <Box>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">User Type</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={userType}
                            onChange={(event) =>setUserType(event.target.value)}
                            >
                            <MenuItem value="Student">Student</MenuItem>
                            <MenuItem value="Professor">Professor</MenuItem>
                            <MenuItem value="Admin">Admin</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
            </div>

            <div className='text-inline'>
                <h2 className='input-txt'>First Name</h2>
                <input className = "input-val" type='text' placeholder='First Name' value={fName} onChange={(event) => setFName(event.target.value)} />
            </div>
            <div className='text-inline'>
                <h2 className='input-txt'>Middle Name</h2>
                <input className = "input-val" type='text' placeholder='Middle Name' value={mName} onChange={(event) => setMName(event.target.value)} />
            </div>
            <div className='text-inline'>
                <h2 className='input-txt'>Last Name</h2>
                <input className = "input-val" type='text' placeholder='Last Name' value={lName} onChange={(event) => setLName(event.target.value)} />
            </div>
            <div className='text-inline'>
                <h2 className='input-txt'>Phone Number</h2>
                <input className = "input-val" type='text' placeholder='Phone Number (optional)' value={phone} onChange={(event) => setPhone(event.target.value)} />
            </div>
            <div className='text-inline'>
                <h2 className='input-txt'>Email</h2>
                <input className = "input-val" type='text' placeholder='Email' value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>
            <div className='text-inline'>
                <h2 className='input-txt'>Password</h2>
                <input className = "input-val" type='text' placeholder='Password' value={pass} onChange={(event) => setPass(event.target.value)} />
            </div>
            {userType === "Professor" ? 
               <div>
                    <div className='text-inline'>
                        <h2  className='input-txt'>Start Time</h2>
                        <div className = "date-time-picker">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker']}>
                                <TimePicker  label="Pick a Start Time"  ampm={false} format='HH:00 ' onChange={onDateChangeStart} value={start} />
                            </DemoContainer>
                        </LocalizationProvider>
                        </div>
                    </div>
                    <div className='text-inline'>
                        <h2  className='input-txt'>End Time</h2>
                        <div className = "date-time-picker">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker']}>
                                <TimePicker  label="Pick a End Time" ampm={false} format='HH:00 ' onChange={onDateChangeEnd} value={end} maxDate={dayjs('2025-12-31')} />
                            </DemoContainer>
                        </LocalizationProvider>
                        </div>
                    </div>
                    <div className='location-form-addbook'>
                        <h2>Days (MWF or TTH)</h2>
                        <div className='form'>
                            <Box>
                                <FormControl fullWidth>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={days}
                                    onChange={(event) =>setDays(event.target.value)}
                                    >
                                    <MenuItem value={1}>MWF</MenuItem>
                                    <MenuItem value={0}>TTH</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                    </div>
                    <div className='location-form-addbook'>
                        <h2>Room Held In</h2>
                        <Box>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Locations</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={heldIn}
                                onChange={(event) =>setHeldIn(event.target.value)}
                                >
                                {[...rooms].map(room => (
                                <MenuItem value={room.room_id}>
                                    {room.room_id}
                                </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
            </div>
                : null
            }

            <button className='confirm-booking' onClick= {HandleSubmit}>
                Add User
            </button>
            <ToastContainer/>
        </div>

    );

}