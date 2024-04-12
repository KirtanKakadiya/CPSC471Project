import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import '../assets/styling/ProfInfo.css';
import ProfCourses, { ProfOfficeHours } from '../components/ProfSchedule';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import dayjs from 'dayjs';
const TODAY = dayjs().add(0, 'day');

export default function ProfessorInfo() {
    const username = useSelector((state) => state.user.username);
    const id = useSelector((state) => state.user.userID);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [coursesTaught, setCourses] = useState([]);
    const [officeHours, setOffice] = useState([]);
    const [officeForm, setVisibility] = useState(false);
    
    async function getCoursesTaught() {
        const route =
            "http://localhost:7003/courses/getprofessorschedule"
            console.log(route);
            const response = await fetch(route, {
                method: "POST",
                headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST",
                "Content-Type": "application/json",
                },
                body: JSON.stringify({prof_id:id})
            });
        if (response.status == 500) {
            toast.error(response.statusText);
        } else if (response.status == 401) {
            toast.error(response.statusText);
        } else if (response.status == 200) {
            response.json().then((resData) => {
                console.log(resData);
                setCourses(resData);
            })
        }
    }

    async function getProfInfo() {
        const route =
            "http://localhost:7003/courses/getprofofficehours"
            console.log(route);
            const response = await fetch(route, {
                method: "POST",
                headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST",
                "Content-Type": "application/json",
                },
                body: JSON.stringify({prof_id:id})
            });
        if (response.status == 500) {
            toast.error(response.statusText);
        } else if (response.status == 401) {
            toast.error(response.statusText);
        } else if (response.status == 200) {
            response.json().then((resData) => {
                console.log(resData);
                setOffice(resData);
            });
        }
    }

    useEffect(()=>{
        getCoursesTaught();
        console.log(coursesTaught);
        getProfInfo();
        console.log(officeHours);
    }, []);

    const showForm = () => {
        setVisibility(true);
    }

    async function ChangeOfficeHours() {
        if(endTime <= startTime) {
            return;
        }
        const route =
            "http://localhost:7003/user/setprofavailability"
            console.log(route);
            const response = await fetch(route, {
                method: "POST",
                headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST",
                "Content-Type": "application/json",
                },
                body: JSON.stringify({startTime:startTime, endTime:endTime, prof_id:id})
            });
        if (response.status == 500) {
            toast.error(response.statusText);
        } else if (response.status == 401) {
            toast.error(response.statusText);
        }
    }

    const onStartChange=(newTime)=>{
        const formattedTime = dayjs(newTime).format('HH:mm:00');
        console.log(formattedTime); // Output: e.g., "14:00:00"
        setStartTime(formattedTime);
    };

    const onEndChange=(newTime)=>{
        const formattedTime = dayjs(newTime).format('HH:mm:00');
        console.log(formattedTime); // Output: e.g., "14:00:00"
        setEndTime(formattedTime);
    };

    return (
        <div className='professor-info-wrapper'>
            <div className='your-info'>
                <h1>Your Information:</h1>
                <p>Name: {username} <br />
                    User ID: {id}
                </p>
            </div>
            <div className='course-and-sched'>
                <h1>Courses and Schedule</h1>
                <ProfCourses data = {coursesTaught} />
                <h1>Professor Office Hours</h1>
                <ProfOfficeHours data = {officeHours} />
                <button className='reshedeule' onClick={showForm}>
                    Reschedule Office Hours
                </button>
                {officeForm && (
                    <form>
                        <h2>Choose start time</h2>
                        <div className = "time-picker">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                    <TimePicker ampm={false} label="Pick a Time" format='HH:mm' onChange={onStartChange} value={startTime} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <h2>Choose end time</h2>
                        <div className = "time-picker">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                    <TimePicker ampm={false} label="Pick a Time" format='HH:mm' onChange={onEndChange} value={endTime} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <button className='submit' onClick={ChangeOfficeHours}>
                            Done
                        </button>
                        <ToastContainer/>
                        <button className='cancel' onClick={null}>
                            Cancel
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}