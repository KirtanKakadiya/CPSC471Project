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

export default function ViewRoom(){

    const [dateTime, setDateTime] = useState(dayjs(TODAY).format('YYYY-MM-D HH:00:00'));
    const [bookings, setBooking] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [location, setLocations] = useState();
    const [floorplan, setFloorplan] = useState();
    const [locations, setLocation] = useState(new Set());
    const [fRooms, setFRooms] = useState([]);


    const onDateChange=(newDate)=>{
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
    });
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