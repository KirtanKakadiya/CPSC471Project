import React from 'react'
import "../assets/styling/Courses.css"
import { useState } from 'react'
import DataTable from "react-data-table-component"

const DUMMYDATA = [
    {
        "course_id":"CPSC 471","section_id":1,"start_time":"12:00:00","end_time":"12:50:00","days_":0,"taught_in":"ICT 102"
    },
    {
        course_id : "271",
        taught_in: "2",
        start_time : "2024-02-15 00:00:0",
        end_time : "2024-02-15 00:00:00",
        days_: 0
    },
    {
        course_id : "271",
        taught_in: "2",
        start_time : "2024-02-15 00:00:0",
        end_time : "2024-02-15 00:00:00",
        days_: 0
      }

  ]

export default function Courses(props){
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
            selector: (row) => row.days_ === 0 ? "MWF" : "TH"
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