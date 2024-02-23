import React from 'react'
import "../assets/styling/Courses.css"
import { useState } from 'react'
import DataTable from "react-data-table-component"

const DUMMYDATA = [
    {
      "id": 1,
      "name": "MATH",
      "roomtype": "Lecture",
      "courseid" : "271",
      "roomnumber": "2",
      "location" : "TFDL",
      "date" : "2024-02-15 00:00:00"
    },
    {
        "id": 2,
        "name": "SENG",
        "roomtype": "Lecture",
        "courseid" : "480",
        "roomnumber": "1",
        "location" : "TFDL",
        "date" : "2023-02-15 02:00:00"
    },
    {
        "id": 3,
        "name": "CPSC",
        "courseid" : "471",
        "roomtype": "Lecture",
        "roomnumber": "3",
        "location" : "ENGG",
        "date" : "2024-02-25 00:00:00"
      }

  ]

export default function Courses(props){
    const [data, setData] = useState(DUMMYDATA)
    const [loading, setLoading] = useState(false)
    const [perPage, setPerPage] = useState(10);

    const columns = [
        {
            name: "Course Name",
            selector: (row) =>row.name,
        },
        {
            name: "Course ID",
            selector: (row) =>row.courseid,
        },
        {
            name: "Location",
            selector: (row) =>row.location,
        },
        {
            name: "Room Number",
            selector: (row) =>row.roomtype + " " + row.roomnumber,
        },
        {
            name: "Time",
            selector: (row) =>row.date,
        }

    ]

    return(
        <div className='restable-content'>
            <DataTable 
                columns={columns}
                data = {data}
                progressPending = {loading}
            />
        </div>
    );
}