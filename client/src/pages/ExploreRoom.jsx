import React, { useEffect } from 'react'
import '../assets/styling/ViewRoom.css'
import FloorPlan from '../components/FloorPlan';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useState } from 'react';
import dayjs from 'dayjs';


const TODAY = dayjs().add(0, 'day');

const DUMMYDATA= [
    {
        id : 1,
        "roomtype" : "Study Room",
        "roomnumber" : "1",
        "capacity" : "8",
        "available" : "true"
    },
    {
        id : 2,
        "roomtype" : "Study Room",
        "roomnumber" : "2",
        "capacity" : "8",
        "available" : "true"
    },
    {
        id : 3,
        "roomtype" : "Study Room",
        "roomnumber" : "3",
        "capacity" : "8",
        "available" : "false"
    },    {
        id : 4,
        "roomtype" : "Lecture Hall",
        "roomnumber" : "1",
        "capacity" : "50",
        "available" : "true"
    },
    {
        id : 5,
        "roomtype" : "Study Room",
        "roomnumber" : "4",
        "capacity" : "8",
        "available" : "false"
    },
    {
        id : 6,
        "roomtype" : "Study Room",
        "roomnumber" : "5",
        "capacity" : "8",
        "available" : "true"
    },
    {
        id : 7,
        "roomtype" : "Lecture Hall",
        "roomnumber" : "2",
        "capacity" : "45",
        "available" : "false"
    },
    {
        id : 8,
        "roomtype" : "Study Room",
        "roomnumber" : "6",
        "capacity" : "8",
        "available" : "true"
    }
]

export default function ViewRoom(){

    const [dateTime, setDateTime] = useState(new Date());
    const [bookings, setBooking] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [location, setLocations] = useState();
    const [floorplan, setFloorplan] = useState();
    const [locations, setLocation] = useState(new Set());
    const [fRooms, setFRooms] = useState([]);


    const onDateChange=(newDate)=>{
        //Your custom code here
        setDateTime(dayjs(newDate).format('YYYY-MM-D HH:00:00'));
       };
    

    rooms.forEach((data) =>{
        const rdata = data.room_id.split(" ");
        locations.add(rdata[0]); 
    });
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
                // toast.error(response.statusText);
            }
            else if(response.status == 401){
                // toast.error(response.statusText);
            }
            else{
                response.json().then(response => setRooms(response));
            }
            
            console.log(rooms)
        }
        RoomData();
    
    useEffect(()=>{
        async function BookingData(){
            const route = "http://localhost:7003/booking/getbooking";
    
            const response = await fetch(route , {
                method: "POST",
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods": "POST",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({date: dateTime}),
            });
            if(response.status == 500){
                // toast.error(response.statusText);
            }
            else if(response.status == 401){
                // toast.error(response.statusText);
            }
            else{
                response.json().then(response => setBooking(response));
            }
            
    
        }
        BookingData();
    }, [dateTime]);


    
    
    useEffect(() => {
        if (!location) return; // Return if location is not selected yet
        const filteredRooms = rooms.filter(data => data.room_id.startsWith(location));
        setFRooms(filteredRooms);
    }, [rooms, location]);





    // console.log(locations);

    return(
        <div className='content-wrapper'>

            <h1>
                Explore Rooms
            </h1>
            
            <div className = "date-time-picker">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker defaultValue={TODAY} disablePast label="Pick a Date and Time" format='YYYY-MM-D HH:00 ' onChange={onDateChange} value={dayjs(dateTime)} />
                    </DemoContainer>
                </LocalizationProvider>
            </div>

            <div className='location-form'>
                <Box>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Locations</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={location}
                        onChange={(event) =>setLocations(event.target.value)}
                        >
                        {[...locations].map(location => (
                        <MenuItem value={location}>
                            {location}
                        </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </Box>
            </div>
            <FloorPlan roomData = {fRooms} locations = {location} booking = {bookings} date = {dateTime}/>

            {/* <FloorPlan roomData = {rooms} locations = {location} booking = {bookings} date = {dateTime}/> */}
            {/* <ToastContainer/> */}
        </div>
    );
}