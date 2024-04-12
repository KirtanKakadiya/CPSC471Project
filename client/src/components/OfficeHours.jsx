import React from 'react'
import "../assets/styling/Courses.css"
import { useState } from 'react'
import DataTable from "react-data-table-component"

export default function OfficeHours(props){
    console.log(props.data);
    const [data, setData] = useState(props.data)
    const [loading, setLoading] = useState(false)
    const [perPage, setPerPage] = useState(10);

    const columns = [
        {
            name: "Instructor",
            selector: (row) => row.f_name + " " + row.l_name
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
        },
        {
            name: "Location",
            selector: (row) =>row.held_in
        },
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