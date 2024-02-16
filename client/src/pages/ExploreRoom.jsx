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


            <FloorPlan />
        </div>
    );
}