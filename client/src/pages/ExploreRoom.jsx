import React, { useEffect } from 'react'
import '../assets/styling/ViewRoom.css'
import FloorPlan from '../components/FloorPlan';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
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

    const onDateChange=(newDate)=>{
        //Your custom code here
        setDateTime(newDate);
       };

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

            <FloorPlan roomData = {JSON.stringify(DUMMYDATA)} />
        </div>
    );
}