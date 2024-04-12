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


const TODAY = dayjs().add(0, 'day');

export default function ScheduleCourses(){
    const username = useSelector((state) => state.user.username)
    const userID = useSelector((state) => state.user.userID)
    const [course, setCourse] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [days, setDays] = useState(null);
    const [dateTime, setDateTime] = useState();
    const [semStartDate, setSemStartDate] = useState("");
    const [semEndDate, setSemEndDate] = useState("");
    const [availableRooms, setAvailableRooms] = useState([]);
    const [rooms, setRooms] = useState("");
    const [section, setSection] = useState("");
    const [classSize, setClassSize] = useState("");


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

    const onDateStartChange=(newDate)=>{
        //Your custom code here
        setSemStartDate(dayjs(newDate).format('YYYY-MM-D'));
    };

    const onDateEndChange=(newDate)=>{
    //Your custom code here
        setSemEndDate(dayjs(newDate).format('YYYY-MM-D'));
    };

    useEffect(()=>{
        async function GetAvailRoom(){
            const body = {
                start_time : start,
                end_time : end,
                days : days,
                semester_start : semStartDate,
                semester_end: semEndDate
            }
            const response = await fetch("http://localhost:7003/courses/getPotentialRooms", {
                    method: "POST",
                    headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST",
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            )
        response.json().then((resData) =>{
            setAvailableRooms(resData);
        })
        }
        if(start != "" && end != "" && days!=null && semStartDate!="" && semEndDate!="")
            GetAvailRoom();
    }, [start, end, days, semStartDate, semEndDate]);
    

    const HandleBooking = () =>{
        if(start == "" || end == "" || days==null || semStartDate=="" || semEndDate=="" || section == "" || classSize == "" || rooms == ""){
            toast.error("Please enter all fields");
        }
        async function addCourse(){
            const body = {
                course_id: course,
                section_id: section,
                created_by: userID,
                class_size: classSize,
                start_time : start,
                end_time : end,
                days : days,
                taught_in: rooms,
                semester_start : semStartDate,
                semester_end: semEndDate
            }

            const response = await fetch("http://localhost:7003/courses/addcourse", {
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
                toast.success("Course Created")
            }
        }

        addCourse();
    }
    return(
        <div className='content-wrapper-addroom'>
            <h1 className='title'>
                Admin Add Room
            </h1>

            <div className='usertype'>
                <h2>Username: {username}</h2>
            </div>
            <div className='text-inline'>
                <h2  className='input-txt'>Course Name</h2>
                <input className = "input-val" type='text' placeholder='Please enter a course name' value={course} onChange={(event) => setCourse(event.target.value)} />
            </div>
            <div className='text-inline'>
                <h2  className='input-txt'>Start Time</h2>
                <div className = "date-time-picker">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                        <TimePicker  label="Pick a Start Time" format='HH:00 ' onChange={onDateChangeStart} value={start} />
                    </DemoContainer>
                </LocalizationProvider>
                </div>
            </div>
            <div className='text-inline'>
                <h2  className='input-txt'>End Time</h2>
                <div className = "date-time-picker">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                        <TimePicker  label="Pick a End Time" format='HH:00 ' onChange={onDateChangeEnd} value={end} maxDate={dayjs('2025-12-31')} />
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
                                    <MenuItem value={true}>MWF</MenuItem>
                                    <MenuItem value={false}>TTH</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
            </div>
            <div className='text-inline'>
                <h2  className='input-txt'>Start Sem Date</h2>
                <div className = "date-time-picker">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker  label="Pick a Start Sem Date" format='YYYY-MM-D ' onChange={onDateStartChange} value={dayjs(dateTime)} />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
            </div>

            <div className='text-inline'>
                <h2  className='input-txt'>End Sem Date</h2>
                <div className = "date-time-picker">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker  label="Pick a End Sem Date" format='YYYY-MM-D' onChange={onDateEndChange} value={dayjs(dateTime)} />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
            </div>

            <div className='text-inline'>
                <h2  className='input-txt'>Available Rooms</h2>
                <div className='location-form'>
                <Box>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Available Rooms</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={rooms}
                        onChange={(event) =>setRooms(event.target.value)}
                        >
                        {[...availableRooms].map(availableRooms => (
                        <MenuItem value={availableRooms.room_id}>
                            {availableRooms.room_id}
                        </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </Box>
            </div>
            </div>

            <div className='text-inline'>
                <h2  className='input-txt'>Section ID</h2>
                <input className = "input-val" type='number' placeholder='Please enter a section id' value={section} onChange={(event) => setSection(event.target.value)} />
            </div>

            <div className='text-inline'>
                <h2  className='input-txt'>Class Size</h2>
                <input className = "input-val" type='number' placeholder='Please enter a class size' value={classSize} onChange={(event) => setClassSize(event.target.value)} />
            </div>
           
            <button className='confirm-booking' onClick= {HandleBooking}>
                Add Course Booking
            </button>
            <ToastContainer/>
            {/* <div className='location-form-addbook'>
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
            <ToastContainer/> */}
        </div>

    );

}