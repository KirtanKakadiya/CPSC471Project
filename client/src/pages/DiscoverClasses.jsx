import React from 'react'
import "../assets/styling/ViewClasses.css"
import Courses from '../components/Courses';

export default function ViewCourse(){
    return(
            <div className='content-viewclasses'>
                <Courses />
                <Courses />
                <Courses />
                <Courses />
            </div>

    );
}