import React, { useEffect } from 'react'
import '../assets/styling/ViewRoom.css'
import FloorPlan from '../components/FloorPlan';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';

export default function ViewRoom(){

    const [dateTime, setDateTime] = useState(new Date());
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");


    // useEffect(() => {
    //     const newDate = new Date(dat     

    // } , [date,time]
    // )
    return(
        <div className='content-wrapper'>

            <h1>
                View Rooms
            </h1>
            <div className = "date-time-picker">
                {/* <LocalizationProvider  dateAdapter={AdapterDayjs}>
                    <DatePicker className = "datepicker" label="Pick a Date" value = {date} onChange={(date) => 
                    {
                        const d = new Date(date).toLocaleDateString('fr-FR');
                        console.log(d);
                        setDate(d);
                    }
                }
                    />
                    <TimePicker className = "timepicker" label = "Pick a Time" views={['hours']} value={time} onChange={setTime} />
                </LocalizationProvider> */}
            </div>
            {date}
            {time}
            <FloorPlan />
        </div>
    );
}