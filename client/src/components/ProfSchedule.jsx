import React from 'react'
import "../assets/styling/Courses.css"
import { useState } from 'react'
import DataTable from "react-data-table-component"

export default function ProfCourses(props){
    console.log(props.data);
    const [data, setData] = useState(props.data)
    const [loading, setLoading] = useState(false)
    const [perPage, setPerPage] = useState(10);

    const columns = [
        {
            name: "Course Name",
            selector: (row) =>row.course_id
        },
        {
            name: "Section",
            selector: (row) => row.section_id
        },
        {
            name: "Location",
            selector: (row) =>row.taught_in
        },
        {
            name: "Begins",
            selector: (row) =>row.start_time
        },
        {
            name: "Ends",
            selector: (row) =>row.end_time
        },
        {
            name: "Days",
            selector: (row) => row.days_ === 0 ? "MWF" : "TTh"
        }
    ]

    return(
        <div className='restable-content'>
            <DataTable 
                columns={columns}
                data = {props.data}
                progressPending = {loading}
            />
        </div>
    );
}

export function ProfOfficeHours(props) {
    const [data, setData] = useState(props.data);
    console.log(props.data);
    const columns = [
        {
            name: "Location",
            selector: (row) =>row.held_in
        },
        {
            name: "Begins",
            selector: (row) =>row.start_time
        },
        {
            name: "Ends",
            selector: (row) =>row.end_time
        },
        {
            name: "Days",
            selector: (row) => row.days_ === 0 ? "MWF" : "TTh"
        }
    ]

    return(
        <div className='restable-content'>
            <DataTable 
                columns={columns}
                data = {props.data}
            />
        </div>
    )
}