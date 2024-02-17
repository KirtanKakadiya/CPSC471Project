import React from 'react'
import DataTable from "react-data-table-component"
import { useState, useEffect } from 'react'
import { MdDelete } from "react-icons/md";


const DUMMYDATA = [
    {
      "id": 1,
      "name": "Student 1",
      "roomtype": "Study Room",
      "roomnumber": "23",
      "location" : "TFDL",
      "date" : "2024-02-15 00:00:00"
    },
    {
        "id": 2,
        "name": "Student 1",
        "roomtype": "Study Room",
        "roomnumber": "23",
        "location" : "TFDL",
        "date" : "2023-02-15 00:00:00"
    },
    {
        "id": 3,
        "name": "Student 1",
        "roomtype": "Study Room",
        "roomnumber": "53",
        "location" : "TFDL",
        "date" : "2024-02-25 00:00:00"
      }

  ]

export default function ReservationsTable(){
    const [data, setData] = useState(DUMMYDATA)
    const [loading, setLoading] = useState(false)
    const [perPage, setPerPage] = useState(10);

    const columns = [
        {
            name: "Name",
            selector: (row) =>row.name,
        },
        {
            name: "Room Type",
            selector: (row) =>row.roomtype,
        },
        {
            name: "Room Number",
            selector: (row) =>row.roomnumber,
        },
        {
            name: "Location",
            selector: (row) =>row.location,
        },
        {
            name: "Date",
            selector: (row) =>row.date,
        },
         {
            name : "Cancel",
            cell : (data) => [<button  onClick={handleEvent(data)}><MdDelete /></button>]
         }

    ]


    const handleEvent = (data) => {
        console.log(data.roomnumber, data.roomtype);
    }

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