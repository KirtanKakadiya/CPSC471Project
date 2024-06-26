import React, { useEffect, useState } from 'react'
import "../assets/styling/ViewClasses.css"
import Courses from '../components/Courses';
import { useRef } from 'react';
const dropDownOptions = [ {key: "Winter 2024"} , {key: "Spring 2024"}, {key: "Fall 2024"}]

export default function ViewCourse(){

    const dropdownRef = useRef(null);
    const linksRef = useRef(null);
    const links = [];
    const [semester, setSemester] = useState("");

    const handleDropDown = () => {
        dropdownRef.current.classList.toggle("show");
    }

    useEffect(() => {
        dropDownOptions.forEach((val) => {
            const aTag = <a>{val.key}</a> 
            links.push(aTag);
        })
    }, [dropDownOptions])
        
    return(
        <div className='roomres-content'>
        <h1>Discover Classes</h1>
        <Courses />
    </div>
);
}