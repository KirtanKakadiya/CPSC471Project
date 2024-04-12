import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import '../assets/styling/StudentInfo.css';
import Courses from '../components/Courses';

export default function StudentInfo() {
    const username = useSelector((state) => state.user.username);
    const id = useSelector((state) => state.user.userID);
    const [courses, setCourses] = useState([]);
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
                resData.forEach(element => {
                    console.log(element);
                });
                setCourses(resData);
            })
        }
    }
    useEffect(()=>{
        getCourses();
    }, []);

    return (
        <div>
            <div>
                <h1>Your Information:</h1>
                <p>Name: {username} <br />
                    User ID: {id}
                </p>
                <h1>Courses and Schedule</h1>
                <Courses data = {courses} />
            </div>
        </div>
    );
}