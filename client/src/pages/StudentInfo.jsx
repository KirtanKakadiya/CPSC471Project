import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import '../assets/styling/StudentInfo.css';
import Courses from '../components/Courses';
import OfficeHours from '../components/OfficeHours';

export default function StudentInfo() {
    const username = useSelector((state) => state.user.username);
    const id = useSelector((state) => state.user.userID);
    const [courses, setCourses] = useState([]);
    const [profOffice, setOffice] = useState([]);

    async function getCourses() {
        const route =
            "http://localhost:7003/courses/getstudentschedule"
            console.log(route);
            const response = await fetch(route, {
                method: "POST",
                headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST",
                "Content-Type": "application/json",
                },
                body: JSON.stringify({student_id:id})
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
            "http://localhost:7003/courses/getprofinfo"
            console.log(route);
            const response = await fetch(route, {
                method: "POST",
                headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST",
                "Content-Type": "application/json",
                },
                body: JSON.stringify({person_id:id})
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
        getCourses();
        getProfInfo();
        console.log(profOffice);
        console.log(courses);
    }, []);

    return (
        <div className='student-info-wrapper'>
            <div className='your-info'>
                <h1>Your Information:</h1>
                <p>Name: {username} <br />
                    User ID: {id}
                </p>
            </div>
            <div className='course-and-sched'>
                <h1>Courses and Schedule</h1>
                <Courses data = {courses} />
                <h1>Professor Office Hours</h1>
                <OfficeHours data = {profOffice} />
            </div>
        </div>
    );
}